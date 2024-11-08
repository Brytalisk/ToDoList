import { IncomingMessage, ServerResponse } from "node:http";
import {TaskModel} from "../database/models/TaskModel";

//Function for create and save task in database
export const createTask = async (req: IncomingMessage, res: ServerResponse) => {
    let body = '';
     req.on('data', (chunk) => {
        body += chunk.toString();
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
            res.writeHead(201, {"Content-Type": "application/json"});
            res.end(JSON.stringify(newTask));
        } catch (error) {
            console.log('catch error ' + error);
            res.writeHead(400, {"Content-Type": "application/json"});
            res.end(JSON.stringify({error: "Помилка під час створення задачі."}));
        }
    })
}

//Function render all saved tasks when you click on Current Tasks
export const getAllTasks = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const allTasks = await TaskModel.find();
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(allTasks));
    } catch (error) {
        console.log('catch error when server try get all Tasks ' + error);
        res.writeHead(500,{"Content-Type": "application/json"});
        res.end(JSON.stringify({error: "Server error"}));
    }
}

//Function for delete task from database and frontend
export const deleteTask = async (req: IncomingMessage, res: ServerResponse) => {
    const urlParts = req.url?.split("/");
    const taskId = urlParts ? urlParts[urlParts.length - 1] : null;

    if (!taskId) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "There are no id of task" }));
        return;
    }
    try {
        // Видаляємо задачу з бази даних за id
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        if (!deletedTask) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Task not found" }));
            return;
        }

        res.writeHead(204, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Resource deleted successfully" }));
    } catch (error) {
        console.error("Error when try delete task:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Server error" }));
    }
}