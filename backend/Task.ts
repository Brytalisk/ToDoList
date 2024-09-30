import { v4 as uuidv4 } from "uuid";

export class Task {
    private id: string;
    private name: string;
    private description: string;
    private status: boolean;

     constructor(name: string, description: string) {
         this.id = uuidv4();
         this.name = name;
         this.description = description;
         this.status = false;
     }

     get getId(): string {
         return this.id;
     }

     get getName(): string {
         return this.name;
     }

     set setName(name: string) {
         this.name = name;
     }

     get getDescription(): string {
         return this.description;
     }

     set setDescription(description: string) {
         this.description = description;
     }

     get getStatus(): boolean {
         return this.status;
     }

     set isStatus(isStatus: boolean) {
         this.status = isStatus;
     }
}