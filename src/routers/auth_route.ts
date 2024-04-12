import { signIn, signUp } from "@src/controllers/auth.controller";
import { Router } from "express";

export const authRoute = Router();

authRoute.post("/sign-up", signUp);
authRoute.post("/sign-in", signIn);
