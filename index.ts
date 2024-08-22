import express, { Response, Request } from "express";
import { connectDb } from "./src/db";
import { app } from "./src/server";
import dotenv from "dotenv";
import { handleErrors } from "./src/middleware/errorHandler";
import { toDoRouter } from "./src/routes";
dotenv.config();
const port: string | number = process.env.PORT || 9000;
app.use(handleErrors);
connectDb();
app.use("/task", toDoRouter);
app.get("/test", (req: Request, res: Response) => {
    res.status(200).json({ "success": true, "message": "Aplicación iniciada con éxito!" });
});

app.listen(port, () => {
    console.log("Escuchando en el puerto " + port);
});
app.on("error", (err: any) => {
    console.error("Ocurrió un error - "+err);
});