import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as Record<string, string>,
      path: "/api/auth",
    });
    if (!session?.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = session.user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
