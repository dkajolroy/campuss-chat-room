import { configApp } from "@src/config/config";
import { User } from "@src/models/user_model";
import { uploader } from "@src/services/upload.service";
import decodeToken from "@src/utils/generate";
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
    const { name, username, email } = req.body;
    const file = req.file;
    if (!name || !username || !email)
      return res.status(400).send({ message: "Invalid form data !" });

    const token = req.cookies[configApp.ssr_cookie];
    const author = decodeToken(token).value;
    if (file) {
      const image = await uploader(file, `/discus/user/${author}`);
      const user = await User.findByIdAndUpdate(
        author,
        {
          name,
          username,
          email,
          image,
        },
        { new: true }
      );
      const { password, ...other } = user._doc;
      return res
        .status(200)
        .send({ user: other, message: "Successfully updated !" });
    }
    const user = await User.findByIdAndUpdate(
      author,
      {
        name,
        username,
        email,
      },
      { new: true }
    );
    const { password, ...other } = user._doc;
    return res
      .status(200)
      .send({ user: other, message: "Successfully updated !" });
    // vine js validation
  } catch (error) {
    next(error);
  }
}

// Delete users   // no
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
