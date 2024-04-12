import { Room } from "@src/models/room_model";
import { NextFunction, Request, Response } from "express";

// create new conversations rooms
export async function newRoom(req: Request, res: Response, next: NextFunction) {
  const { isGroup, name, members, author } = req.body;
  try {
    if (!members && !members.length)
      return res.status(400).send({ message: "Add more members" });

    // find exist
    const exist = await Room.findOne({
      members: { $all: [...members, author] },
      isGroup: false,
    });
    if (exist)
      return res
        .status(200)
        .send({ room: exist, message: "Already exist chats room !" });
    // New rooms
    const room = await Room.create({
      isGroup,
      members: [...members, author],
      name,
    });
    await room.populate("members", "_id name email image username");

    res.status(200).send({ room, message: "Room successfully created !" });
  } catch (error) {
    next(error);
  }
}

// Get conversations room
export async function getRooms(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { author } = req.body;
  try {
    const rooms = await Room.find({
      members: {
        $in: [author],
      },
    })
      .populate("members", "_id name username image")
      .populate({
        path: "last_msg",
        populate: { path: "sender", select: "_id name" },
      })
      .sort({ updatedAt: -1 });
    res.status(200).send(rooms);
  } catch (error) {
    next(error);
  }
}

export async function removeRoom(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // remove all sms
    // remove all media
    // remove all room
  } catch (error) {
    next(error);
  }
}
