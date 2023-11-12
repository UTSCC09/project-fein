import { rmSync } from "fs";
import { join } from "path";
import { createServer } from "http";
import express from "express";
import { MongoClient } from "mongodb"
import session from "express-session";
import { parse, serialize } from "cookie";
import { genSalt, hash, compare } from "bcrypt";
import validator from "validator";


const PORT = 4000;
const app = express();

app.use(express.json());

const mongo_client = new MongoClient('mongodb+srv://fein-db-username:!Fein247pp@cluster0.b75qkv4.mongodb.net/?retryWrites=true&w=majority');
const database = mongo_client.db('Fein');

const users = database.collection('users');
const positions = database.collection('positions');

const base_path = "https://finnhub.io/api/v1"

// function getItems(page, limit) {
//     limit = Math.max(5, (limit) ? parseInt(limit) : 5);
//     page = page || 0;
//     return new Promise(function (resolve, reject) {
//         items
//             .find({})
//             .sort({ createdAt: -1 })
//             .skip(page * limit)
//             .limit(limit)
//             .exec(function (err, items) {
//                 if (err) return reject(err);
//                 return resolve(items);
//             });
//     });
// }

// function addItem(content) {
//     return new Promise(function (resolve, reject) {
//         items.insert({ content }, async function (err, item) {
//             if (err) return reject(err);
//             return resolve(item);
//         });
//     })
// }

// function deleteItem(_id) {
//     return new Promise(function (resolve, reject) {
//         items.remove({ _id }, { multi: false }, function (err, num) {
//             if (err) return reject(err);
//             return resolve(num);
//         });
//     })
// }

const checkUsername = function (req, res, next) {
    if (!validator.isAlphanumeric(req.body.username)) return res.status(400).end("bad input");
    next();
};

const isAuthenticated = function (req, res, next) {
    if (!req.session.user._id) return res.status(401).end("access denied");
    next();
};

app.use(
    session({
        secret: "Yarrggghh",
        resave: false,
        saveUninitialized: true,
        // cookie: {
        //     // httpOnly: true, // prevent the session cookie from being read by Javascript onn the browser
        //     // secure: false,  // prevent the cookie to be sent with http, should be set to true when https is enabled
        //     // samesite: 'strict' // prevent the cookie from being sent with cross-domain requests, should be set to lax when frontend is served on different domain
        // }
    })
);

app.use(function (req, res, next) {
    const username = (req.session.user) ? req.session.user._id : '';
    res.setHeader('Set-Cookie', serialize('username', username, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    next();
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND);
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.post("/api/signup/", checkUsername, function (req, res, next) {
    // extract data from HTTP request
    if (!("username" in req.body))
        return res.status(400).end("username is missing");
    if (!("password" in req.body))
        return res.status(400).end("password is missing");
    let username = req.body.username;
    let password = req.body.password;
    // check if user already exists in the database
    users.findOne({ _id: username }, function (err, user) {
        if (err) return res.status(500).end(err);
        if (user)
            return res.status(409).end("username " + username + " already exists");
        // generate a new salt and hash
        genSalt(10, function (err, salt) {
            hash(password, salt, function (err, hash) {
                // insert new user into the database
                users.updateOne(
                    { _id: username },
                    { _id: username, hash: hash, fein_bucks: 3000 },
                    { upsert: true },
                    function (err) {
                        if (err) return res.status(500).end(err);
                        return res.json(username);
                    }
                );
            });
        });
    });
});

app.post('/api/signin/', checkUsername, function (req, res, next) {
    // extract data from HTTP request
    if (!('username' in req.body)) return res.status(400).end('username is missing');
    if (!('password' in req.body)) return res.status(400).end('password is missing');
    let username = req.body.username;
    let password = req.body.password;
    // retrieve user from the database
    users.findOne({ _id: username }, function (err, user) {
        if (err) return res.status(500).end(err);
        if (!user) return res.status(401).end("access denied");
        compare(password, user.hash, function (err, valid) {
            if (err) return res.status(500).end(err);
            if (!valid) return res.status(401).end("access denied");
            // start a session
            req.session.user = user;
            res.setHeader('Set-Cookie', serialize('username', user._id, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
                // secure: true,
                // sameSite: true
            }));
            return res.json(username);
        });
    });
});

app.get('/api/signout/', function (req, res, next) {
    req.session.destroy();
    res.setHeader('Set-Cookie', serialize('username', '', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
        // secure: true,
        // sameSite: true
    }));
    //return res.redirect("/");
    return res.json({});
});

app.get('/api/supported_stock/', isAuthenticated, function (req, res, next) {   //gonna implement caching for this later
    const url = `${base_path}/stock/symbol?exchange=US&token=cl71pi9r01qvnckae940cl71pi9r01qvnckae94g`
    fetch(url)
        .then(x => {
            if (!x.ok) {
                return res.status(x.status).end("Finnhub API error")
            }
            return res.json(x.json());
        })
});

app.get('/api/company_profile/:symbol/', isAuthenticated, function (req, res, next) {   //gonna implement caching for this later
    const url = `${base_path}/stock/profile2?symbol=${req.params.symbol}&token=cl71pi9r01qvnckae940cl71pi9r01qvnckae94g`
    fetch(url)
        .then(x => {
            if (!x.ok) {
                return res.status(x.status).end("Finnhub API call error")
            }
            return res.json(x.json());
        })
});

app.get('/api/price/:symbol/', isAuthenticated, function (req, res, next) {   //gonna implement caching for this later
    const url = `${base_path}/quote?symbol=${req.params.symbol}&token=cl71pi9r01qvnckae940cl71pi9r01qvnckae94g`
    fetch(url)
        .then(x => {
            if (!x.ok) {
                return res.status(x.status).end("Finnhub API call error")
            }
            return res.json(x.json());
        })
});

app.get('/api/candle/:symbol/:resolution/:from/:to/', isAuthenticated, function (req, res, next) {   //gonna implement caching for this later
    const url = `${base_path}/stock/candle?symbol=${req.params.symbol}&resolution=${req.params.resolution}&from=${req.params.resolution}&to=${req.params.to}&token=cl71pi9r01qvnckae940cl71pi9r01qvnckae94g`
    fetch(url)
        .then(x => {
            if (!x.ok) {
                return res.status(x.status).end("Finnhub API call error")
            }
            return res.json(x.json());
        })
});

// app.get("/api/items/", async function (req, res, next) {
//     const items = await getItems(req.params.page, req.params.limit);
//     return res.json(items);
// });

// app.post("/api/items/", async function (req, res, next) {
//     await addItem(req.body.content);
//     const items = await getItems(req.params.page, req.params.limit);
//     return res.json(items);
// });

// app.delete("/api/items/:id/", async function (req, res, next) {
//     await deleteItem(req.params.id);
//     const items = await getItems(req.params.page, req.params.limit);
//     return res.json(items);
// });



const server = createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});