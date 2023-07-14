import {Request, Response, NextFunction } from "express";

class AppError extends Error{
    statusCode: number;

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
    
    }
}

const handleErrors = async(err:Error, request:Request, response:Response, next:NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message
        });
    
    }
    console.log(err);

    return response.status(500).json({
        message: "Internal server error"   
    })
};

export {AppError, handleErrors}