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
import { Server } from 'socket.io';
import http from 'http';

const PORT = 4000;
const app = express();

app.use(express.json());

const dbURI = 'mongodb+srv://fein-db-username:!Fein247pp@cluster0.b75qkv4.mongodb.net/Fein?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to Mongoose"))
    .catch((err) => console.log(err));

const base_path = "https://finnhub.io/api/v1"

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND);
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "*");
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
                    User.findOneAndUpdate({ username: username }, { username: username, hash: hash, fein_bucks: 3000 }, { upsert: true })
                        .then(() => {
                            req.session.username = username;
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

app.get('/api/supported_stock/', async function (req, res, next) {   //gonna implement caching for this later
    const url = `${base_path}/stock/symbol?exchange=US&token=cl71pi9r01qvnckae940cl71pi9r01qvnckae94g`
    const data = await fetch(url);
    if (!data.ok) {
        return res.status(500).end(await data.text());
    }
    return res.json(await data.json());
});

app.get('/api/company_profile/:symbol/', async function (req, res, next) {   //gonna implement caching for this later
    const url = `${base_path}/stock/profile2?symbol=${req.params.symbol}&token=cl71pi9r01qvnckae940cl71pi9r01qvnckae94g`
    //const url = `${base_path}`
    const data = await fetch(url);
    if (!data.ok) {
        return res.status(500).end(await data.text());
    }
    return res.json(await data.json());
});

app.get('/api/price/:symbol/', async function (req, res, next) {   //gonna implement caching for this later
    const url = `${base_path}/quote?symbol=${req.params.symbol}&token=cl71pi9r01qvnckae940cl71pi9r01qvnckae94g`
    const data = await fetch(url);
    if (!data.ok) {
        return res.status(500).end(await data.text());
    }
    return res.json(await data.json());
});

app.get('/api/candle/:symbol/:resolution/', async function (req, res, next) {   //gonna implement caching for this later
    let outputsize;
    if (req.params.resolution === '1h') {
        outputsize = '24';
    } else if (req.params.resolution === '1day') {
        outputsize = '7';
    } else if (req.params.resolution === '1week') {
        outputsize = '4';
    } else if (req.params.resolution === '1month') {
        outputsize = '12';
    }
    const url = `https://api.twelvedata.com/heikinashicandles?symbol=${req.params.symbol}&interval=${req.params.resolution}&outputsize=${outputsize}&apikey=${process.env.TWELVE_DATA_API_KEY}`
    const fetched_data = await fetch(url);
    const data = await fetched_data.json()
    //console.log(data);
    if (!data.status === "ok") {
        return res.status(500).end(data.message);
    }
    return res.json(data);
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

    socket.on('join-room', (room) => {
        console.log(`user with id-${socket.id} joined room - ${roomId}`)
        socket.join(roomId);
    });

    socket.on('send-message', (message) => {
        socket.to(message.roomId).emit('receive-message', message);
    });

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected`);
    });
});
const PORT2 = 3001;
httpServer.listen(PORT2, () => {
  console.log(`Socket.io server is running on port ${PORT2}`);
});

