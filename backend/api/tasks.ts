import { IncomingMessage, ServerResponse } from "http";
import { Task } from "../ts/Task";

let tasks: Task[] = [];

export function handleTaskRequest(req: IncomingMessage, res: ServerResponse) {
    let body = "";

    req.on("data", chunk => {
        body += chunk;
    });

    req.on("end", () => {
        try {
            const { name, description, date } = JSON.parse(body);
            const newTask = new Task(name, description, date ? new Date(date) : undefined);  // Створюємо новий Task
            tasks.push(newTask);
            console.log("Everything is good" + newTask.getName);

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newTask));
        } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Невірний формат даних" }));
        }
    });
}