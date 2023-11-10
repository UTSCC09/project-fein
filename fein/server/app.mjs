import { rmSync } from "fs";
import { join } from "path";
import { createServer } from "http";
import express from "express";
import Datastore from "nedb";

const PORT = 4000;
const app = express();

app.use(express.json());

// const items = new Datastore({
//   filename: join("db", "items.db"),
//   autoload: true,
//   timestampData: true,
// });

function getItems(page, limit) {
    limit = Math.max(5, (limit) ? parseInt(limit) : 5);
    page = page || 0;
    return new Promise(function (resolve, reject) {
        items
            .find({})
            .sort({ createdAt: -1 })
            .skip(page * limit)
            .limit(limit)
            .exec(function (err, items) {
                if (err) return reject(err);
                return resolve(items);
            });
    });
}

function addItem(content) {
    return new Promise(function (resolve, reject) {
        items.insert({ content }, async function (err, item) {
            if (err) return reject(err);
            return resolve(item);
        });
    })
}

function deleteItem(_id) {
    return new Promise(function (resolve, reject) {
        items.remove({ _id }, { multi: false }, function (err, num) {
            if (err) return reject(err);
            return resolve(num);
        });
    })
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND);
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.get("/api/items/", async function (req, res, next) {
    const items = await getItems(req.params.page, req.params.limit);
    return res.json(items);
});

app.post("/api/items/", async function (req, res, next) {
    await addItem(req.body.content);
    const items = await getItems(req.params.page, req.params.limit);
    return res.json(items);
});

app.delete("/api/items/:id/", async function (req, res, next) {
    await deleteItem(req.params.id);
    const items = await getItems(req.params.page, req.params.limit);
    return res.json(items);
});

app.use(express.static("static"));

const server = createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});