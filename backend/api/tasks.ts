import { IncomingMessage, ServerResponse } from "node:http";
import {Task} from "../ts/Task";


export const createTask = (req: IncomingMessage, res: ServerResponse) => {
    let body = '';
    console.log(req.method + " " + req.url);
     req.on('data', (chunk) => {
        body += chunk.toString(); // Збираємо дані з тіла запиту
         console.log('body ' + body.toString());
    });

    req.on('end', () => {
       try {
           const formData = JSON.parse(body);
           console.log('after ' + formData);

            const newTask = new Task(formData.taskName, formData.taskDescription, formData.taskDate);
            console.log("newTask created" + newTask.getName);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(newTask));
       } catch(error) {
           console.log('catch')

        }
    })

}