import { UploadMedia } from "./data";

export interface IUser {
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  image: UploadMedia;
}
export interface IRoom {
  // is Group
  name: string;
  image: UploadMedia;
  isGroup: boolean;
  // global
  last_msg: IMessage;
  members: IUser[];
}

export interface IMessage {
  sender: IUser;
  receiver: IRoom;
  text: string;
  isRemove: boolean;
  media: UploadMedia[];
  reactions: IUser[];
  reader: [];
}
