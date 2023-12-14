import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { User } from "./User";

export interface DecodedUser extends JwtPayload {
  userId: string;
  email: string;
}

export interface WithAuthRequest extends Request {
  decoded?: DecodedUser;
}

