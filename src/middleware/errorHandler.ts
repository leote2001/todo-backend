import { Request, Response, NextFunction } from "express";
export const handleErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
console.error(`Error: ${err.message}`);
return res.status(500).json({
    "success": false,
    "message": "Ha ocurrido un error durante la solicitud"
});
} 