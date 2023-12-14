import { NextFunction, Request, Response } from "express";
import usersService from "../../services/usersService";
import { ApiError } from "../../middlewares/errors/ApiError";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const { name, email, password, roleId } = req.body;
    const user = await usersService.signUp(name, email, password, roleId);
    if (!user) {
        next(ApiError.badRequest("User not created"));
        return;
    }
  res.status(201).json({user, message: "User created"});
}
