import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const userSignUpHandler = async (req: Request, res: Response) => {
  try {

    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hash
      }
    });

    return res.status(201).json({ success: true, message: "User created successfully" });

  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
}

export const userLoginHandler = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) {
      return res.status(201).json({ success: false, message: "Enter correct password" });
    }

    const data = { user: { id: user.id }}
    const token = jwt.sign(data, JWT_SECRET);
    return res.status(200).json({ success: true, token: token });

  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
}