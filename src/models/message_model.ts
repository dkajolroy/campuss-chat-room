import { IMessage } from "@src/types/schema";
import { Schema, model } from "mongoose";

const messageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.ObjectId, ref: "Users", required: true },
    receiver: { type: Schema.ObjectId, ref: "Chats", required: true },
    isRemove: { type: Boolean, default: false },
    media: [
      {
        public_id: { type: String },
        secure_url: { type: String },
        resource_type: { type: String, enum: ["image", "video"] },
      },
    ],
    text: { type: String },
    reader: [{ type: Schema.ObjectId, ref: "Users" }],
    reactions: [{ type: Schema.ObjectId, ref: "Users" }],
  },
  { timestamps: true, versionKey: false }
);

export const Message = model("Messages", messageSchema);
