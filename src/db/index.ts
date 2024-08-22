import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
export const connectDb = async () => {
    const mongodb_url: string = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017";
    try {
        await mongoose.connect(mongodb_url);
        console.log("Conectado a mongoDb");
    } catch (err: any) {
        console.error("Ocurrió un error al conectarse a la base de datos - "+err.message);
    }
}  