import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validateBody = 
    (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
        const result  = schema.safeParse(req.body);
        if (!result.success) {
            console.log(result.error.issues);
            res.status(400).json({ 
                message: "Erro ao validar o body", 
                errors: result.error.issues.map(issue => ({
                    path: issue.path,
                    error: issue.message
                }))
            });
            return;
        }
        req.body = result.data;
        next();
};