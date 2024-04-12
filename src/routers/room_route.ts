import { getRooms, newRoom } from "@src/controllers/room.controller";
import { Router } from "express";

export const roomRoute = Router();

roomRoute.post("/new", newRoom);
roomRoute.get("/all", getRooms);
