import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

export const generateToken = (email: string, id: string): string => {
  return jwt.sign(
    {
      email,
      id,
    },
    secretKey,
    { expiresIn: "24h" }
  );
};

