import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
    id: string;
    name: string;
    description: string;
    status: boolean;
    date: Date | null;
}

const taskSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
    date: { type: Date, default: null }
});

export const TaskModel = mongoose.model<ITask>("Task", taskSchema);