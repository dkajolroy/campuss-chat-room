import {
  getRooms,
  newRoom,
  updatesRoom,
} from "@src/controllers/room.controller";
import { upload } from "@src/services/upload.service";
import { Router } from "express";

export const roomRoute = Router();

roomRoute.post("/new", newRoom);
roomRoute.get("/all", getRooms);
roomRoute.put("/update/:room_id", upload.single("image"), updatesRoom);
