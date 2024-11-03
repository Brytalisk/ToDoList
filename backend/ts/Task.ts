import { v4 as uuidv4 } from "uuid";

export class Task {
    private readonly id: string;
    private name: string;
    private description: string;
    private status: boolean;
    private date: Date | null;

     constructor(name: string, description: string, date?: Date | null) {
         this.id = uuidv4();
         this.name = name;
         this.description = description;
         this.status = false;
         this.date = date ? date : null;
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

     get getDate(): Date | null {
         return this.date;
     }

     get getStatus(): boolean {
         return this.status;
     }

     set isStatus(isStatus: boolean) {
         this.status = isStatus;
     }
}