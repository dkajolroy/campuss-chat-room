interface Room {
  _id: string;
  last_msg?: Message;
  members: IUser[];
  isGroup: boolean;
  name?: string;
  image?: Media;
  createdAt: string;
  updatedAt: string;
}

interface Message {
  _id: string;
  text: string;
  media: Media[];
  sender: IUser;
  reactions: string[];
  reader: string[];
  receiver: string;
  chat: Chat;
  createdAt: string;
  updatedAt: string;
}
