import type { Request, Response } from "express";
import { authService } from "./auth.service";

const register = async(req: Request, res: Response) => {
       try {  
        const result = await authService.registerUserInDatabase(req.body)
        res.status(201).json({
            status: 'success',
            message: 'User signed up successfully',
            data: result
        })
    } 
    catch (error: any) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to sign up user',
            error: error.message
        })
    }
}
const login = async(req: Request, res: Response) => {
    try{
        const result = await authService.loginUserInDatabase(req.body)
        res.status(200).json({
            status: 'success',
            message: 'User signed in successfully',
            data: result
        })
    }
    catch (error: any) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to sign in user',
            error: error.message
        })
    }
}
export const authController = {
    register,
    login
}