import { rmSync } from "fs";
import { join } from "path";
import { createServer } from "http";
import express from "express";
import mongoose, { get } from "mongoose"
import session from "express-session";
import { parse, serialize } from "cookie";
import { genSalt, hash, compare } from "bcrypt";
import validator from "validator";
import User from "./models/user.mjs";
import Stock from "./models/stock.mjs"
import Position from "./models/position.mjs";
import { Server } from 'socket.io';
import http from 'http';
import Memcached from "memcached";

const PORT = 4000;
const app = express();

app.use(express.json());

const dbURI = 'mongodb+srv://fein-db-username:!Fein247pp@cluster0.b75qkv4.mongodb.net/Fein?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to Mongoose"))
    .catch((err) => console.log(err));

const base_path = "https://finnhub.io/api/v1"

const memcached = new Memcached('localhost:11211');

const warmCache = function () {
    console.log("Retrieving stocks from the database");
    Stock.find({})
        .sort({ symbol: 1 })
        .exec()
        .then((documents) => {
            console.log("Storing stocks in memcached");
            memcached.set("stocks", documents, 0, function (err) {
                if (err) console.log(err);
            })
        })
        .catch((err) => {
            console.log('Error retrieving stocks')
        });
}
warmCache();

const getStocks = (callback) => {
    memcached.get('stocks', function (err, data) {
        if (err) return callback(err, null);
        return callback(null, data);
    });
};

const getCompanyProfile = (symbol, callback) => {
    memcached.get(`${symbol}_profile`, function (err, data) {
        if (err) return callback(err, null);
        if (data == null) return callback(null, null);
        console.log("got profile from cache")
        return callback(null, data)
    });
}

const setCompanyProfile = async (symbol, callback) => {
    const url = `${base_path}/stock/profile2?symbol=${symbol}&token=cl71pi9r01qvnckae940cl71pi9r01qvnckae94g`
    const data = await fetch(url);
    if (!data.ok) {
        return callback(await data.text(), null);
    }
    const result = await data.json()
    memcached.set(`${symbol}_profile`, result, 60 * 60 * 24, function (err) {
        if (err) return callback(err, null)
        console.log("got profile from fetch and stored in cache")
        return callback(null, result);
    })
}

const getCompanyPrice = (symbol, callback) => {
    memcached.get(`${symbol}_price`, function (err, data) {
        if (err) return callback(err, null);
        if (data == null) return callback(null, null);
        console.log("got price from cache")
        return callback(null, data)
    });
}

const setCompanyPrice = async (symbol, callback) => {
    const url = `${base_path}/quote?symbol=${symbol}&token=cl71pi9r01qvnckae940cl71pi9r01qvnckae94g`
    const data = await fetch(url);
    if (!data.ok) {
        if (typeof callback === "function") return callback(await data.text(), null);
        return await data.text();
    }
    const result = await data.json()
    memcached.set(`${symbol}_price`, result, 60 * 60 * 2, function (err) {
        if (err) {
            if (typeof callback === "function") return callback(err, null);
            return err;
        }
        console.log("got price from fetch and stored in cache")
        if (typeof callback === "function") return callback(null, result);
        return result;
    })
}

const getCompanyCandle = (symbol, resolution, outputsize, callback) => {
    memcached.get(`${symbol}_${resolution}_candle`, function (err, data) {
        if (err) return callback(err, null);
        if (data == null) return callback(null, null);
        console.log("got candle from cache")
        return callback(null, data)
    });
}

const setCompanyCandle = async (symbol, resolution, outputsize, callback) => {
    const url = `https://api.twelvedata.com/heikinashicandles?symbol=${symbol}&interval=${resolution}&outputsize=${outputsize}&apikey=${process.env.TWELVE_DATA_API_KEY}`
    const fetched_data = await fetch(url);
    const data = await fetched_data.json()
    if (!data.status === "ok") {
        return callback(data.message, null)
    }
    memcached.set(`${symbol}_${resolution}_candle`, data, 60 * 60, function (err) {
        if (err) return callback(err, null)
        console.log("got candle from fetch and stored in cache")
        return callback(null, data);
    })
}

const getSearchQuery = (query, callback) => {
    memcached.get(`query_${query}`, function (err, data) {
        if (err) return callback(err, null);
        if (data == null) return callback(null, null);
        console.log("got query from cache")
        return callback(null, data)
    });
}

const setSearchQuery = async (query, callback) => {
    const url = `${base_path}/search?q=${query}&token=cl71pi9r01qvnckae940cl71pi9r01qvnckae94g`
    const data = await fetch(url);
    if (!data.ok) {
        return callback(await data.text(), null);
    }
    const response = await data.json()
    getStocks(function (err, data) {
        if (err) return callback(err, null);
        response.result = response.result.filter((itemRes) => data.some((itemData) => itemData.symbol === itemRes.symbol));
        response.count = response.result.length;
        memcached.set(`query_${query}`, response, 60 * 60 * 24, function (err) {
            if (err) return callback(err, null)
            console.log("got query from fetch and stored in cache")
            return callback(null, response);
        })
    })
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND);
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(
    session({
        secret: "Yarrggghh",
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true, // prevent the session cookie from being read by Javascript onn the browser
            secure: false,
            samesite: 'none'
        }
    })
);

app.use(function (req, res, next) {
    const username = (req.session.user) ? req.session.user.username : '';
    res.setHeader('Set-Cookie', serialize('username', username, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
        secure: false,
        samesite: 'none'
    }));
    next();
});

// app.use(function (req, res, next) {
//     let cookies = parse(req.headers.cookie || "");
//     req.username = cookies.username ? cookies.username : null;
//     console.log("HTTP request", req.username, req.method, req.url, req.body);
//     next();
// });

app.use(function (req, res, next) {
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

app.options("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND);
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.send();
});

const checkUsername = function (req, res, next) {
    if (!validator.isAlphanumeric(req.body.username)) return res.status(400).end("Username not alphanumeric");
    next();
};

const isAuthenticated = function (req, res, next) {
    if (!req.session.user.username) return res.status(401).end("access denied");
    next();
};

app.post("/api/signup/", checkUsername, function (req, res, next) {
    if (!("username" in req.body))
        return res.status(400).end("username is missing");
    if (!("password" in req.body))
        return res.status(400).end("password is missing");
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({ username: username })
        .then(user => {
            if (user)
                return res.status(409).end("username " + username + " already exists");
            genSalt(10, function (err, salt) {
                hash(password, salt, function (err, hash) {
                    User.findOneAndUpdate({ username: username }, { username: username, hash: hash, fein_bucks: -1 }, { upsert: true })
                        .then(() => {
                            //req.session.username = username;
                            res.json({ username: username });
                        })
                        .catch((err) => res.status(500).end(err));
                });
            });
        })
        .catch(err => {
            return res.status(500).end(err);
        });
});

app.post('/api/signin/', checkUsername, function (req, res, next) {
    // extract data from HTTP request
    if (!('username' in req.body)) return res.status(400).end('username is missing');
    if (!('password' in req.body)) return res.status(400).end('password is missing');
    const username = req.body.username;
    let password = req.body.password;
    // retrieve user from the database
    User.findOne({ username: username })
        .then(user => {
            if (!user)
                return res.status(401).end("access denied");
            compare(password, user.hash, function (err, valid) {
                if (err) return res.status(500).end(err);
                if (!valid) return res.status(401).end("access denied");
                // start a session
                req.session.user = user;
                //console.log(req.session.user);
                res.setHeader(
                    'Set-Cookie',
                    serialize('username', user.username, {
                        path: "/",
                        maxAge: 60 * 60 * 24 * 7,
                        secure: false,
                        samesite: 'none'
                    })
                );
                return res.json({ username: username });
            });
        })
        .catch(err => {
            return res.status(500).end(err);
        });
});

app.get('/api/signout/', function (req, res, next) {
    req.session.destroy();
    res.setHeader('Set-Cookie', serialize('username', '', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
        secure: false,
        samesite: 'none'
    }));
    //return res.redirect("/");
    return res.json({});
});

app.get('/api/search/:query/', isAuthenticated, async function (req, res, next) {
    getSearchQuery(req.params.query, async function (err, data) {
        if (err) return res.status(500).end(err);
        if (data === null) {
            await setSearchQuery(req.params.query, function (err, data) {
                if (err) return res.status(500).end(err);
                return res.json(data);
            })
        } else {
            return res.json(data);
        }
    })
});

app.get('/api/supported_stock/:page', isAuthenticated, async function (req, res, next) {
    getStocks(function (err, data) {
        if (err) return res.status(500).end(err);
        //console.log("made it");
        return res.json(data.slice(0 + 10 * (req.params.page - 1), 10 + 10 * (req.params.page - 1)))
    })
});

app.get('/api/company_profile/:symbol/', isAuthenticated, async function (req, res, next) {
    getCompanyProfile(req.params.symbol, async function (err, data) {
        if (err) return res.status(500).end(err);
        if (data === null) {
            await setCompanyProfile(req.params.symbol, function (err, data) {
                if (err) return res.status(500).end(err);
                return res.json(data);
            })
        } else {
            return res.json(data);
        }
    });
});

app.get('/api/price/:symbol/', isAuthenticated, async function (req, res, next) {
    getCompanyPrice(req.params.symbol, async function (err, data) {
        if (err) return res.status(500).end(err);
        if (data === null) {
            await setCompanyPrice(req.params.symbol, function (err, data) {
                if (err) return res.status(500).end(err);
                return res.json(data);
            })
        } else {
            return res.json(data);
        }
    });
});

app.get('/api/candle/:symbol/:resolution/', isAuthenticated, async function (req, res, next) {
    let outputsize = '-1';
    if (req.params.resolution === '1h') {
        outputsize = '24';
    } else if (req.params.resolution === '1day') {
        outputsize = '7';
    } else if (req.params.resolution === '1week') {
        outputsize = '4';
    } else if (req.params.resolution === '1month') {
        outputsize = '12';
    }

    getCompanyCandle(req.params.symbol, req.params.resolution, outputsize, async function (err, data) {
        if (err) return res.status(500).end(err);
        if (data === null) {
            await setCompanyCandle(req.params.symbol, req.params.resolution, outputsize, function (err, data) {
                if (err) return res.status(500).end(err);
                return res.json(data);
            })
        } else {
            return res.json(data);
        }
    });
});

app.get('/api/fein_bucks/:username/', isAuthenticated, async function (req, res, next) {
    const username = req.params.username;
    if (username !== req.session.user.username) return res.status(403).end("forbidden");
    User.findOne({ username: username })
        .then(user => {
            if (!user)
                return res.status(401).end("username does not exist")
            if (username !== req.session.user.username)
                return res.status(403).end("forbidden");
            console.log(user.fein_bucks);
            return res.json({ fein_bucks: user.fein_bucks })
        })
        .catch(err => {
            return res.status(500).end(err);
        });
});

app.patch('/api/add_bucks/', isAuthenticated, async function (req, res, next) {
    if (!('username' in req.body)) return res.status(400).end('username is missing');
    if (!('add_amount' in req.body)) return res.status(400).end('add_amount is missing');
    const username = req.body.username;
    const add_amount = req.body.add_amount;
    if (isNaN(add_amount)) return res.status(400).end('add_amount is not an number');
    if (add_amount < 1) return res.status(400).end('invalid amount');
    if (username !== req.session.user.username) return res.status(403).end("forbidden");
    User.findOneAndUpdate({ username: username }, { $inc: { fein_bucks: add_amount } }, { new: true })
        .then(updatedDoc => {
            if (!updatedDoc) return res.status(401).end("no user with that username found");
            return res.json({ username: updatedDoc.username, fein_bucks: updatedDoc.fein_bucks })
        })
        .catch(err => {
            return res.status(500).end(err);
        })
});

const getPriceData = async (symbol) => {
    return new Promise((resolve, reject) => {
        getCompanyPrice(symbol, async (err, data) => {
            if (err) {
                reject(err);
            } else if (data === null) {
                try {
                    const newData = await setCompanyPrice(symbol);
                    resolve(newData);
                } catch (error) {
                    reject(error);
                }
            } else {
                resolve(data);
            }
        });
    });
};

app.post('/api/buy_stock/', isAuthenticated, async function (req, res, next) {
    if (!('username' in req.body)) return res.status(400).end('username is missing');
    if (!('symbol' in req.body)) return res.status(400).end('symbol is missing');
    if (!('amount' in req.body)) return res.status(400).end('amount is missing');
    const username = req.body.username;
    const symbol = req.body.symbol
    const amount = req.body.amount;
    if (isNaN(amount)) return res.status(400).end('amount is not an number');
    if (amount < 1) return res.status(400).end('invalid amount');
    if (username !== req.session.user.username) return res.status(403).end("forbidden");
    User.findOne({ username: username })
        .then((user) => {
            if (!user)
                return res.status(409).end("username " + username + " doesn't exists");
            getPriceData(symbol)
                .then(price_data => {
                    console.log(price_data);
                    if (user.fein_bucks < (amount * price_data.pc).toFixed(2)) return res.status(409).end("username " + username + " doesn't have enough");
                    Position.findOne({ username: username, symbol: symbol })
                        .then(position => {
                            if (!position) {
                                Position.findOneAndUpdate({ username: username, symbol: symbol }, { username: username, symbol: symbol, numShares: amount, totalSpent: (amount * price_data.pc).toFixed(2) }, { upsert: true })
                                    .then((addedDocument) => {
                                        //console.log(addedDocument)
                                        User.findOneAndUpdate({ username: username }, { $inc: { fein_bucks: -((amount * price_data.pc).toFixed(2)) } }, { new: true })
                                            .then(updatedDoc => {
                                                console.log("made it 2")
                                                return res.json({ username: username, fein_bucks: updatedDoc.fein_bucks });
                                            })
                                            .catch(err => {
                                                return res.status(500).end(err);
                                            })
                                    })
                                    .catch((err) => res.status(500).end(err));
                            } else {
                                Position.findOneAndUpdate({ username: username, symbol: symbol }, { $inc: { numShares: amount, totalSpent: (amount * price_data.pc).toFixed(2) } }, { new: true })
                                    .then((updatedPosition) => {
                                        User.findOneAndUpdate({ username: username }, { $inc: { fein_bucks: -((amount * price_data.pc).toFixed(2)) } }, { new: true })
                                            .then(updatedDoc => {
                                                return res.json({ username: username, fein_bucks: updatedDoc.fein_bucks });
                                            })
                                            .catch(err => {
                                                return res.status(500).end(err);
                                            })
                                    })
                                    .catch((err) => res.status(500).end(err));
                            }
                        })
                        .catch(err => {
                            return res.status(500).end(err);
                        });
                })
                .catch((err) => res.status(500).end(err))
        })
        .catch(err => {
            return res.status(500).end(err);
        });
});

app.post('/api/sell_stock/', isAuthenticated, async function (req, res, next) {
    if (!('username' in req.body)) return res.status(400).end('username is missing');
    if (!('symbol' in req.body)) return res.status(400).end('symbol is missing');
    if (!('amount' in req.body)) return res.status(400).end('amount is missing');
    const username = req.body.username;
    const symbol = req.body.symbol
    const amount = req.body.amount;
    if (isNaN(amount)) return res.status(400).end('amount is not an number');
    if (amount < 1) return res.status(400).end('invalid amount');
    if (username !== req.session.user.username) return res.status(403).end("forbidden");
    User.findOne({ username: username })
        .then((user) => {
            if (!user)
                return res.status(409).end("username " + username + " doesn't exists");
            getPriceData(symbol)
                .then(price_data => {
                    console.log(price_data);
                    Position.findOne({ username: username, symbol: symbol })
                        .then(position => {
                            if (!position) return res.status(409).end(username + " doesn't have this stock");
                            if (amount > position.numShares) return res.status(409).end(username + " selling more shares than owned");
                            Position.findOneAndUpdate({ username: username, symbol: symbol }, { $inc: { numShares: -amount }, $set: { totalSpent: ((position.totalSpent / position.numShares) * (position.numShares - amount)).toFixed(2) } }, { new: true })
                                .then((updatedPosition) => {
                                    User.findOneAndUpdate({ username: username }, { $inc: { fein_bucks: ((amount * price_data.pc).toFixed(2)) } }, { new: true })
                                        .then(updatedDoc => {
                                            return res.json(updatedPosition);
                                        })
                                        .catch(err => {
                                            return res.status(500).end(err);
                                        })
                                })
                                .catch((err) => res.status(500).end(err));
                        })
                        .catch(err => {
                            return res.status(500).end(err);
                        });
                })
                .catch((err) => res.status(500).end(err))
        })
        .catch(err => {
            return res.status(500).end(err);
        });
});

app.get('/api/positions/:username/', isAuthenticated, async function (req, res, next) {
    try {
        const username = req.params.username;
        if (username !== req.session.user.username) {
            return res.status(403).end("forbidden");
        }
        const positions = await Position.find({ username: username }).exec();
        if (positions.length === 0) {
            return res.json({ result: [] });
        }
        const resultList = [];
        for (const position of positions) {
            const price_data = await getPriceData(position.symbol);
            resultList.push({ ...position, current_value: (position.numShares * price_data.pc).toFixed(2) });
        }
        return res.json({ result: resultList });
    } catch (err) {
        return res.status(500).end(err.message || "Internal Server Error");
    }
});


const server = createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});

// Socket.io stuff


const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);

    socket.on('join-room', (roomId) => {
        console.log(`user with id-${socket.id} joined room - ${roomId}`)
        socket.join(roomId);
    });

    socket.on('send-message', (message) => {
        socket.to(message.roomID).emit('receive-message', message);
        console.log(message);
    });

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected`);
    });
});
const PORT2 = 3001;
httpServer.listen(PORT2, () => {
    console.log(`Socket.io server is running on port ${PORT2}`);
});

