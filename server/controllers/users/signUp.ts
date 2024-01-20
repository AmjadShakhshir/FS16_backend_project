import { NextFunction, Request, Response } from "express";
import usersService from "../../services/usersService";
import { ApiError } from "../../middlewares/errors/ApiError";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await usersService.signUp(req.body);
    if (!user) {
        next(ApiError.badRequest("User not created"));
        return;
    }
    res.status(201).json({user, message: "User created"}); 
  } catch (error) {
    next(ApiError.resourceNotFound("Cannot add User"));
  }
}
