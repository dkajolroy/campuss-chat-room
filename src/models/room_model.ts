import { IRoom } from "@src/types/schema";
import { Schema, model } from "mongoose";

const roomSchema = new Schema<IRoom>(
  {
    name: { type: String, minlength: 2, maxlength: 100 },
    isGroup: { type: Boolean, default: false },
    last_msg: { type: Schema.ObjectId, ref: "Messages" },
    members: [
      {
        type: Schema.ObjectId,
        ref: "Users",
      },
    ],
    image: {
      public_id: { type: String },
      secure_url: { type: String },
      resource_type: { type: String },
    },
  },
  { timestamps: true, versionKey: false }
);

export const Room = model("Rooms", roomSchema);
