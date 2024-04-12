import { findUsers } from "@src/controllers/user.controller";
import { Router } from "express";

export const userRoute = Router();

userRoute.get("/search", findUsers);
