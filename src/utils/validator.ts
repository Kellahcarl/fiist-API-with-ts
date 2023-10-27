import Joi, { Schema, ValidationResult } from "joi";
import { Task, User } from "../types/interface";

export const validateTask = (task: Task): ValidationResult => {
  const schema: Schema = Joi.object().keys({
    name: Joi.string().required(),
    project_id: Joi.string().required(),
    duration: Joi.string().required(),
    description: Joi.string().min(5).required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
  });

  return schema.validate(task);
};

export const validateUsers = (user: User): ValidationResult => {
  const schema: Schema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    age: Joi.number().min(18).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    isAdmin: Joi.bool().required(),
    gender: Joi.string().required(),
  });

  return schema.validate(user);
};
