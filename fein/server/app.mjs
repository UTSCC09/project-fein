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
        return callback(await data.text(), null);
    }
    const result = await data.json()
    memcached.set(`${symbol}_price`, result, 60 * 60 * 2, function (err) {
        if (err) return callback(err, null)
        console.log("got price from fetch and stored in cache")
        return callback(null, result);
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
    //console.log(req.session.user);
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

app.get('/api/supported_stock/', isAuthenticated, async function (req, res, next) {
    // const url = `${base_path}/stock/symbol?exchange=US&token=cl71pi9r01qvnckae940cl71pi9r01qvnckae94g`
    // const data = await fetch(url);
    // if (!data.ok) {
    //     return res.status(500).end(await data.text());
    // }
    // const x = await data.json();
    // console.log(x.length);
    // return res.json(x);
    getStocks(function (err, data) {
        if (err) return res.status(500).end(err);
        //console.log("made it");
        return res.json(data)
    })
});

app.get('/api/company_profile/:symbol/', isAuthenticated, async function (req, res, next) {
    // const url = `${base_path}/stock/profile2?symbol=${req.params.symbol}&token=cl71pi9r01qvnckae940cl71pi9r01qvnckae94g`
    // //const url = `${base_path}`
    // const data = await fetch(url);
    // if (!data.ok) {
    //     return res.status(500).end(await data.text());
    // }
    // return res.json(await data.json());
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
    // const url = `${base_path}/quote?symbol=${req.params.symbol}&token=cl71pi9r01qvnckae940cl71pi9r01qvnckae94g`
    // const data = await fetch(url);
    // if (!data.ok) {
    //     return res.status(500).end(await data.text());
    // }
    // return res.json(await data.json());
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
    // const url = `https://api.twelvedata.com/heikinashicandles?symbol=${req.params.symbol}&interval=${req.params.resolution}&outputsize=${outputsize}&apikey=${process.env.TWELVE_DATA_API_KEY}`
    // const fetched_data = await fetch(url);
    // const data = await fetched_data.json()
    // //console.log(data);
    // if (!data.status === "ok") {
    //     return res.status(500).end(data.message);
    // }
    // return res.json(data);
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

