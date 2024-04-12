import { User } from "@src/models/user_model";
import { sendCookie } from "@src/utils/cookie";
import { genUsername, isEmail, newToken } from "@src/utils/generate";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

// Register controller
export async function signUp(req: Request, res: Response, next: NextFunction) {
  const { name, email } = req.body;
  const pass = String(req.body.password);

  // validate form-data
  if (!name || !email || !pass || pass.length < 5)
    return res.status(400).send({ message: "Invalid form-data !" });
  if (!isEmail(email))
    return res.status(400).send({ message: "Invalid your email !" });

  try {
    // generate username and encrypt password
    const username = genUsername(name);
    const enc_pass = bcrypt.hashSync(pass, 10);
    const user = await User.create({
      name,
      email,
      password: enc_pass,
      username,
    });
    // send cookie
    const token = newToken(String(user._id));
    const uToken = newToken(user.username);
    sendCookie(res, { ssr: token, csr: uToken });

    // send data
    const { password, ...other } = user._doc;
    res.status(200).send({ user: other, message: "Successfully signup !" });
  } catch (error) {
    next(error);
  }
}

// Login controller
export async function signIn(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const pass = req.body.password;
  // validate form data
  if (!username || !pass)
    return res.status(400).send({ message: "Invalid form-data !" });
  try {
    // find user and validate
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user || !(await bcrypt.compare(String(pass), user.password)))
      return res
        .status(400)
        .send({ message: "Invalid username or password !" });

    // send cookie
    const token = newToken(String(user._id));
    const uToken = newToken(user.username);
    sendCookie(res, { ssr: token, csr: uToken });

    // send data
    const { password, ...other } = user._doc;
    return res
      .status(200)
      .send({ user: other, message: "Successfully sign in" });
  } catch (error) {
    next(error);
  }
}
