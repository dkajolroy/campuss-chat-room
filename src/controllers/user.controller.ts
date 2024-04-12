import { User } from "@src/models/user_model";
import { NextFunction, Request, Response } from "express";

export async function findUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { author } = req.body;
  const text = String(req.query.text);
  try {
    const users = await User.find({
      name: new RegExp(text, "i"),
    }).limit(20);
    return res.status(200).send(users);
  } catch (error) {
    next(error);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // vine js validation
  } catch (error) {
    next(error);
  }
}

export async function removeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // vine js validation
  } catch (error) {
    next(error);
  }
}
