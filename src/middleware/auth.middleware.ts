import { configApp } from "@src/config/config";
import decodeToken from "@src/utils/generate";
import { NextFunction, Request, Response } from "express";

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies[configApp.ssr_cookie];

  if (token) {
    try {
      const data = decodeToken(token);
      req.body.author = data.value;
      next();
    } catch (error) {
      // send cookie
    }
  } else {
    // unauthorize
  }
}
