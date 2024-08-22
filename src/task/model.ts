import { Task } from "src/controller/types";
import mongoose, {Schema, model} from "mongoose";
const taskSchema = new Schema<Task>({
    task: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Work", "Personal", "Urgent", "Home"],
        default: "Personal"
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
    },
    {
        timestamps: true
});

export const taskModel = model<Task>("Task", taskSchema);