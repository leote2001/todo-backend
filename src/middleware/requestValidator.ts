import { Request, Response, NextFunction } from "express";
export const validateToDoRequest = (type: any, req: Request, res: Response, next: NextFunction) => {
    const { task, category, isCompleted } = req.body;
    const errors = [];

    if (!task) {
        errors.push("Debes introducir una tarea");
    } else if (task.length < 3) {
        errors.push("La tarea debe tener al menos 3 caracteres");
    }
    const validCategories = ["Personal", "Work", "Home", "Urgent"];
    if (!validCategories.includes(category)) {
        errors.push("Debes ingresar una categoría válida");
    } else if (!category) {
        errors.push("Debes ingresar una categoría");
    }
    if (type === "edit" && isCompleted == undefined) {
        errors.push("isCompleted es requerido");
    } else if (isCompleted !== undefined && typeof isCompleted !== "boolean") {
        errors.push("Debes ingresar un dato válido");
    }
    if (errors.length > 0) {
        return res.status(400).json({
            "success": false,
            "message": errors
        });
    }
    next();
}