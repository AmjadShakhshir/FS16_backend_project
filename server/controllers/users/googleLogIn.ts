import { Response, NextFunction } from "express";

import usersService from "../../services/usersService";
import { ApiError } from "../../middlewares/errors/ApiError";

export async function googleLogIn(
  req: any,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  const accessToken = await usersService.googleLogin(user);
  if (!accessToken) {
    next(ApiError.forbidden("Credentials is invalid"));
    return;
  }
  res.json({
    accessToken,
  });
}
