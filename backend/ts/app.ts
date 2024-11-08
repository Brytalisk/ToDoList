import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import {IncomingMessage, ServerResponse} from "node:http";
import {createTask, getAllTasks, deleteTask} from "../api/tasks";
import {connectToDatabase} from "../database/db";
import cors from "cors";

//CORS settings
const corsOptions = {
    origin: "http://localhost:63342",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
const corsMiddleware = cors(corsOptions);

const PORT = 3000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    corsMiddleware(req, res, () => {
        if (req.url?.startsWith("/createTask") && req.method === "POST") {
            createTask(req, res)
        } else if (req.url?.startsWith("/renderTasks") && req.method === "GET") {
            getAllTasks(req, res);
        } else if(req.url?.startsWith("/deleteTask/") && req.method === "DELETE") {
            deleteTask(req, res);
        } else {
            res.writeHead(404, {ContentType: "text/plain"});
            res.end("Route not found\n")
        }
    })
})

connectToDatabase().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});
