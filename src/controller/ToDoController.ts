import { Task } from "./types";
import { Request, Response, NextFunction } from "express";
import { taskModel } from "../task/model";
import { IToDo } from "./interfaces";

export class ToDoController implements IToDo {
    async create(req: Request, res: Response, next: NextFunction) {
        const { task, category } = req.body;
        try {
            const newTask: Task = { task, category };
            const existingTask = await taskModel.findOne({ task, category });
            if (existingTask) {
                res.status(400).json({
                    success: false,
                    message: "La tarea ya existe"
                });
                return;
            }
            await taskModel.create(newTask);
            res.status(201).json({
                success: true,
                message: "Tarea creada con éxito!"
            });
        } catch (err: any) {
            next(err);
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const all: Task[] = await taskModel.find();
            res.status(200).json({
                success: true,
                all
            });
        } catch (err: any) {
            next(err);
        }
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const task: Task | null = await taskModel.findById({ _id: id });
            if (!task) {
                res.status(404).json({
                    success: false,
                    message: "Tarea no encontrada"
                });
                return;
            }
            res.status(200).json({
                success: true,
                task
            });
        } catch (err: any) {
            next(err);
        }
    }
    async edit(req: Request, res: Response, next: NextFunction) {
        const { task, category, isCompleted } = req.body;
        const { id } = req.params;
        try {
            const updatedTask: Task | null = await taskModel.findByIdAndUpdate(id, { task, category, isCompleted });
            if (!updatedTask) {
                res.status(404).json({
                    success: false,
                    message: "Tarea no encontrada"
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Tarea actualizada!"
            });
        } catch (err: any) {
            next(err);
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const task: Task | null = await taskModel.findById({ _id: id });
            if (!task) {
                res.status(404).json({
                    success: false,
                    message: "Tarea no encontrada"
                });
                return;
            }
            await taskModel.deleteOne({ _id: id });
            res.status(200).json({
                success: true,
                message: "Tarea eliminada!"
            });
        } catch (err: any) {
            next(err);
        }
    }
}