import * as http from "http";
import { handleTaskRequest } from "../api/tasks";

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url?.startsWith("/api/tasks")) {
        handleTaskRequest(req, res);
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not found");
    }
});

server.listen(PORT, () => {
    console.log("Сервер запущено на http://localhost:3000");
});