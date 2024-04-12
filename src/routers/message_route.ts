import { getMessage, sendMessage } from "@src/controllers/message.controller";
import { upload } from "@src/services/upload.service";
import { Router } from "express";

export const messageRoute = Router();

messageRoute.post("/to/:room_id", upload.array("images"), sendMessage);
messageRoute.get("/:room_id", getMessage);
messageRoute.post("/remove/:msg_id");
