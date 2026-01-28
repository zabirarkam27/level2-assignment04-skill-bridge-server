import { Request, Response } from "express";
import { auth } from "../../lib/auth";

// Register controller
export const register = async (req: Request, res: Response) => {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      },
      path: "/api/auth",
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: "Registration failed" });
  }
};

// Login controller
export const login = async (req: Request, res: Response) => {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email: req.body.email,
        password: req.body.password,
      },
      path: "/api/auth",
    });
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: "Login failed! Invalid Credentials" });
  }
};

// getCurrentUser controller
export const getCurrentUser = async (req: Request, res: Response) => {
  res.json(req.user);
};

// Logout controller
export const logout = async (req: Request, res: Response) => {
  try {
    await auth.api.signOut({
      headers: req.headers as Record<string, string>,
      path: "/api/auth",
    });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ message: "Logout failed" });
  }
};
