import { IncomingMessage, ServerResponse } from "node:http";
import {Task} from "../ts/Task";


export const createTask = (req: IncomingMessage, res: ServerResponse) => {
    let body = '';
     req.on('data', (chunk) => {
        body += chunk.toString(); // Збираємо дані з тіла запиту
    });

    req.on('end', () => {
       try {
           const formData = JSON.parse(body);
            const newTask = new Task(formData.taskName, formData.taskDescription, formData.taskDate);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(newTask));
       } catch(error) {
           console.log('catch error ' + error);
        }
    })

}