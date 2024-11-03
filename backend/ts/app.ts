import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import {IncomingMessage, ServerResponse} from "node:http";
import {createTask} from "../api/tasks";
import {connectToDatabase} from "../database/db";

const PORT = 3000;


connectToDatabase();// Connect to MongoDB

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
    }

    if(req.url?.startsWith("/createTask") && req.method === "POST") {
        createTask(req, res);
    } else {
        res.writeHead(404, {ContentType: "text/plain"});
        res.end("Route not found\n")
    }
})

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})
