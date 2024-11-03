import { IncomingMessage, ServerResponse } from "node:http";
import {TaskModel} from "../database/models/TaskModel";


export const createTask = async (req: IncomingMessage, res: ServerResponse) => {
    let body = '';
     req.on('data', (chunk) => {
        body += chunk.toString(); // Збираємо дані з тіла запиту
    });

    req.on('end', async () => {
        try {
            const formData = JSON.parse(body);
            const newTask = new TaskModel({
                name: formData.taskName,
                description: formData.taskDescription,
                date: formData.taskDate ? new Date(formData.taskDate) : null,
                status: false
            });

            const savedTask = await newTask.save();
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(newTask));
        } catch (error) {
            console.log('catch error ' + error);
            res.writeHead(400, {"Content-Type": "application/json"});
            res.end(JSON.stringify({error: "Помилка під час створення задачі."}));
        }
    })
}