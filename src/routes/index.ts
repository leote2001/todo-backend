import express, {Request, Response, NextFunction} from "express";
import { ToDoController } from "../controller/ToDoController";
import { validateToDoRequest } from "../middleware/requestValidator";
export const toDoRouter = express.Router(); 
const createValidationMiddleware = (type: any) => (req: Request, res: Response, next: NextFunction) => validateToDoRequest(type, req, res, next); 
const taskController = new ToDoController();

toDoRouter.post("/new", createValidationMiddleware("create"), taskController.create);

toDoRouter.get("/all", taskController.getAll); 

toDoRouter.get("/:id", taskController.getById); 

toDoRouter.put("/:id", createValidationMiddleware("edit"), taskController.edit);

toDoRouter.delete("/:id", taskController.delete);