import { Request, Response, NextFunction, RequestHandler } from "express";

export const controlWrapper = (ctrl: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
