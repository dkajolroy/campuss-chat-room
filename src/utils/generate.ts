import { configApp } from "@src/config/config";
import jwt from "jsonwebtoken";
import slugify from "slugify";

// generate new token
export function newToken(value: string) {
  return jwt.sign({ value }, configApp.secret_key, {
    expiresIn: "30d",
  });
}
// decrypt token
export default function decodeToken(value: string) {
  return jwt.verify(value, configApp.secret_key) as { value: string };
}

// generate username
export function genUsername(name: string) {
  const randomNumber = (Math.random() * 999).toString().split(".")[0];
  const slug = slugify(name, {
    replacement: ".",
    lower: true,
    trim: true,
  });
  return `${slug || `user-${randomNumber}`}.${randomNumber}`; // unique name
}

// email validator
export function isEmail(email: string) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
