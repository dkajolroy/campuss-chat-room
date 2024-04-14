import { findUsers, updateUser } from "@src/controllers/user.controller";
import { upload } from "@src/services/upload.service";
import { Router } from "express";

export const userRoute = Router();

userRoute.get("/search", findUsers);
userRoute.put("/update", upload.single("image"), updateUser);
