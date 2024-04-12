import { configApp } from "@src/config/config";
import { io } from "@src/index";
import { Message } from "@src/models/message_model";
import { Room } from "@src/models/room_model";
import { uploader } from "@src/services/upload.service";
import decodeToken from "@src/utils/generate";
import { NextFunction, Request, Response } from "express";

// send message
export async function sendMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { room_id } = req.params;
  try {
    const { text } = req.body;
    const files = req.files as Express.Multer.File[];
    const token = req.cookies[configApp.ssr_cookie];
    const author = decodeToken(token).value;

    // upload media first
    const media = await Promise.all(
      files.map(async (xx) => await uploader(xx, `/discuss/message/${room_id}`))
    );

    // validate form-data
    if (!text && !media.length)
      return res.status(400).send({ message: "Invalid message data !" });

    // send message
    const message = await Message.create({
      text,
      media,
      sender: author,
      receiver: room_id,
    });
    await message.populate("sender", "_id name username image");
    // update last msg of chat
    const room = await Room.findByIdAndUpdate(
      room_id,
      {
        $set: { last_msg: message._id },
      },
      { new: true }
    )
      .populate("members", "_id name username image")
      .populate({
        path: "last_msg",
        populate: { path: "sender", select: "_id name" },
      });
    io.to(room_id).emit("receive_msg", { message, room });
    res.status(200).send({ message: "Send message successfully !" });
  } catch (error) {
    next(error);
  }
}

// remove message
export async function getMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { room_id } = req.params;
    const limit = req.query.limit || 50;

    const messages = await Message.find({ receiver: room_id })
      .limit(Number(limit))
      .populate("sender", "_id name username image");

    res.status(200).send(messages);
  } catch (error) {
    next(error);
  }
}

// remove message
export async function removeMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { msg_id } = req.params;
    // delete all media first
    await Message.findByIdAndUpdate(msg_id, {
      $set: { remove: true },
    });
    res.status(200).send({ message: "Update message successfully !" });
  } catch (error) {
    next(error);
  }
}
