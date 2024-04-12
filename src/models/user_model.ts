import { IUser } from "@src/types/schema";
import { Schema, model } from "mongoose";

const userSchema = new Schema<WithDoc>(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 100 },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
      unique: true,
    },
    phone: { type: String, minlength: 5, maxlength: 100 },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      unique: true,
    },
    password: { type: String, minlength: 5, maxlength: 500 },
    image: {
      public_id: { type: String },
      secure_url: {
        type: String,
        default:
          "https://res.cloudinary.com/kajolroy/image/upload/v1711345477/campus/default/149071_zwemjr_io5l9y.png",
      },
      resource_type: { type: String, enum: ["image"] },
    },
  },
  { timestamps: true, versionKey: false }
);
export const User = model("Users", userSchema);

interface WithDoc extends IUser {
  _doc: IUser;
}
