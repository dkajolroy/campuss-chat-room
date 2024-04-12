import { configApp } from "@src/config/config";
import { Response } from "express";

export function sendCookie(
  res: Response,
  { ssr, csr }: { ssr: string; csr: string }
) {
  res.cookie(configApp.ssr_cookie, ssr, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  res.cookie(configApp.csr_cookie, csr, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
}
