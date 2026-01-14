import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { findUserByEmail } from "../handler/findUserByEmail.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user in database
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({message: "Invalid credentials"});
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        users_id: user.users_id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: {
        users_id: user.users_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
