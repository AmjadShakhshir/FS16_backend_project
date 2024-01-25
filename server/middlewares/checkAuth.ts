import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { DecodedUser, WithAuthRequest } from "../types/Auth";
import { ApiError } from "./errors/ApiError";

export function checkAuth(
  req: WithAuthRequest,
  _: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    console.error('Authorization header is not found');
    next(ApiError.forbidden("Authorization header is not found"));
    return;
  }

  const parts = authHeader.split(" ");
  
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    console.error('Authorization header is not in Bearer <token> format');
    next(ApiError.forbidden("Authorization header is not in Bearer <token> format"));
    return;
  }

  const token = parts[1];
  
  if (!token) {
    next(ApiError.forbidden("Token is not found"));
    return;
  }
  const decoded = jwt.verify(
    token,
    process.env.TOKEN_SECRET as string
  ) as DecodedUser;
  req.decoded = decoded;
  next();
}
