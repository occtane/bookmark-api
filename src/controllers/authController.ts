import { Request, Response } from "express";
import { authService } from "../services/authService";
import { RegisterDTO, LoginDTO } from "../models/User";

export const authController = {
  // POST /api/auth/register - User registration
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const data: RegisterDTO = req.body;

      // Basic Validation
      if (!data.email || !data.password || !data.name) {
        res
          .status(400)
          .json({ error: "Email, password and name are required" });
        return;
      }

      if (data.password.length < 6) {
        res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });
        return;
      }

      const result = await authService.register(data);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error && error.message === "Email already in use") {
        res.status(409).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Registration failed" });
    }
  },

  // POST /api/auth/login - User login
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const data: LoginDTO = req.body;

      // Basic validation
      if (!data.email || !data.password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      const result = await authService.login(data);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error && error.message === "Invalid credentials") {
        res.status(401).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Login failed" });
    }
  },
};
