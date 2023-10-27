import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY as string;

export const authToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.send("No token provided");
  } else {
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided" });
    }

    try {
      const data = await jwt.verify(token, secretKey);
      (req as any).user = data; // You may need to define a user property on the request object or use custom request types.
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token" });
    }
  }
};


