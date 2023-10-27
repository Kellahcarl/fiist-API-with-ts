import { Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import { execute, query } from "../services/db";
import { generateToken } from "../utils/tokenGenerator";
import { validateUsers } from "../utils/validator";

export const testUser = (req: Request, res: Response) => {
  try {
    res.send({ message: "User registered successfully" });
  } catch (error) {
    return res.status(501).json({ error: error });
  }
};

export const getLoggedUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;
    const { recordset } = await query(
      "SELECT u.[_id],u.first,u.last,u.email,u.age,u.gender,u.password FROM [users] u WHERE u.email = @email"
    );
    const user = recordset[0];

    const token = generateToken(user.email, user._id);
    res.send({
      user: _.pick(user, [
        "_id",
        "first",
        "last",
        "email",
        "gender",
        "age",
        "isAdmin",
      ]),
      token,
    });
  } catch (error) {
    res.status(500).send({ error: error, message: "Internal Server Error" });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const result = await query(
      "SELECT u.[_id],u.first,u.last,u.email,u.age,u.gender,u.password FROM [users] u WHERE u.email = @email "
    );

    if (result) {
      const recordset = result.recordset;
      const user = recordset[0];

      if (!user) {
        return res.status(404).send({ message: "Account does not exist" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(404).send({ message: "Invalid email or password" });
      }

      const token = generateToken(user.email, user._id); // Assuming 'generateToken' is a defined function.
      return res.send({
        user: _.pick(user, ["_id", "first", "last", "email", "gender", "age"]),
        token,
      });
    } else {
      return res.status(404).send({ message: "Account does not exist" });
    }
  } catch (error) {
    // console.error("Database error:", error);
    return res.status(500).send({ message: "Database error" });
  }
};

export const resetPassword = async () => {};
export const forgotPassword = async () => {};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { error } = validateUsers(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    const { recordset } = await query(
      "SELECT u.[_id],u.first,u.last,u.email,u.age,u.gender,u.password FROM [users] u WHERE u.email = @email "
    );

    const user = recordset[0];
    if (user)
      return res
        .status(404)
        .send({ message: "Account exists with the given email" });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const { firstname, email, gender, age, lastname } = req.body;
    const id = uuidv4();

    
    await query(
      "INSERT INTO dbo.users (_id, first, last, email, gender, age, password, isAdmin) VALUES (@id, @firstname, @lastname, @email, @gender, @age, @password, @isAdmin)"
    );

    return res.send({ message: "User registered successfully" });
  } catch (error) {
    // console.log(error.message);
    return res
      .status(500)
      .send({ error: (error as Error).message, message: "Internal Server Error" });
  }
};


export const getUsers = async () => {};
export const getUser = async () => {};
export const updateUser = async () => {};
export const deleteUser = async () => {};
