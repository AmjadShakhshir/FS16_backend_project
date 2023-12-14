import { Request, Response, NextFunction } from "express";

import { ApiError } from "../../middlewares/errors/ApiError";
import UsersService from "../../services/usersService";

export async function getAllUsers(
  _: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await UsersService.findAll();
    if (!users) {
      next(ApiError.resourceNotFound("Users not found"));
      return;
    }
    if (users.length <= 0) {
      res.status(200).json({ msg: "No users data yet" });
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    next(ApiError.resourceNotFound("Users not found"));
  }
}
