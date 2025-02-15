import { ApiError } from "../utils/apiError";
export const erroHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
    return res.status(500).json({
        status: "error",
        message: "Internal Server ERR"
    });
};
