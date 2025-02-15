import { Request, Response , NextFunction } from "express";
import { ApiError } from "../utils/apiError";

 

export const erroHandler = (
    err: Error | ApiError,
    req: Request,
    res : Response | any,
    next: NextFunction 
) => {

    if (err instanceof ApiError){
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: "Internal Server ERR"
    })
}