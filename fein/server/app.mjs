import { rmSync } from "fs";
import { join } from "path";
import { createServer } from "http";
import express from "express";
import mongoose from "mongoose"
import session from "express-session";
import { parse, serialize } from "cookie";
import { genSalt, hash, compare } from "bcrypt";
import validator from "validator";
import User from "./models/user.mjs";


const PORT = 4000;
const app = express();

app.use(express.json());

const dbURI = 'mongodb+srv://fein-db-username:!Fein247pp@cluster0.b75qkv4.mongodb.net/Fein?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to Mongoose"))
    .catch((err) => console.log(err));


const base_path = "https://finnhub.io/api/v1"

function login(username, password) {
    return new Promise(function (resolve, reject) {
        User.findOne({ username: username })
            .then(user => {
                if (!user)
                    return reject("access denied");
                compare(password, user.hash, function (err, valid) {
                    if (err)
                        return reject(err);
                    if (!valid)
                        return reject("access denied");
                    return resolve(user);
                });
            })
            .catch(err => reject(err));
    });
}

const checkUsername = function (req, res, next) {
    if (!validator.isAlphanumeric(req.body.username)) return res.status(400).end("bad input");
    next();
};

const isAuthenticated = function (req, res, next) {
    if (!req.session.user) return res.status(401).end("access denied");
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

app.use(function (req, res, next) {
    console.log("HTTP request", req.method, req.url, req.body);
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
    User.findOne({ username: username })
        .then(user => {
            if (user)
                return res.status(409).end("username " + username + " already exists");
            genSalt(10, function (err, salt) {
                hash(password, salt, function (err, hash) {
                    User.findOneAndUpdate({ username: username }, { username: username, hash: hash, fein_bucks: 3000 }, { upsert: true })
                        .then(() => res.json({ username: username }))
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
    let username = req.body.username;
    let password = req.body.password;
    // retrieve user from the database
    login(username, password)
        .then(user => {
            req.session.user = user.username;
            res.setHeader('Set-Cookie', serialize('username', user.username, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
                // secure: true,
                // sameSite: true
            }));
            return res.json(user);
        })
        .catch(err => res.status(500).end(err));
    // users.findOne({ _id: username }, function (err, user) {
    //     if (err) return res.status(500).end(err);
    //     if (!user) return res.status(401).end("access denied");
    //     compare(password, user.hash, function (err, valid) {
    //         if (err) return res.status(500).end(err);
    //         if (!valid) return res.status(401).end("access denied");
    //         // start a session
    //         req.session.user = user;
    //         res.setHeader('Set-Cookie', serialize('username', user._id, {
    //             path: '/',
    //             maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
    //             // secure: true,
    //             // sameSite: true
    //         }));
    //         return res.json(username);
    //     });
    // });
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

app.get('/api/supported_stock/', async function (req, res, next) {   //gonna implement caching for this later
    const url = `${base_path}/stock/symbol?exchange=US&token=cl71pi9r01qvnckae940cl71pi9r01qvnckae94g`
    const data = await fetch(url);
    if (!data.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    res.json(await data.json());
});

app.get('/api/company_profile/:symbol/', async function (req, res, next) {   //gonna implement caching for this later
    const url = `${base_path}/stock/profile2?symbol=${req.params.symbol}&token=cl71pi9r01qvnckae940cl71pi9r01qvnckae94g`
    const data = await fetch(url);
    if (!data.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    res.json(await data.json());
});

app.get('/api/price/:symbol/', async function (req, res, next) {   //gonna implement caching for this later
    const url = `${base_path}/quote?symbol=${req.params.symbol}&token=cl71pi9r01qvnckae940cl71pi9r01qvnckae94g`
    const data = await fetch(url);
    if (!data.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    res.json(await data.json());
});

app.get('/api/candle/:symbol/:resolution/:from/:to/', async function (req, res, next) {   //gonna implement caching for this later
    const url = `${base_path}/stock/candle?symbol=${req.params.symbol}&resolution=${req.params.resolution}&from=${req.params.from}&to=${req.params.to}&token=cl71pi9r01qvnckae940cl71pi9r01qvnckae94g`
    const data = await fetch(url);
    if (!data.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    res.json(await data.json());
});

const server = createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});