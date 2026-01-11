import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { findUserByEmail } from "../handler/findUserByEmail.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Find user in database
    const user = await findUserByEmail(email);

    if (!user) {
        return res.status(400).json({ message: "Email is required" });
    }

    // Password type auth
    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //   return res.status(401).json({ message: "Invalid credentials" });
    // }

    // Generate JWT token
    const token = jwt.sign(
      {
        users_id: user.users_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    res.json({
      token,
      user: {
        users_id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
