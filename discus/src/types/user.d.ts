interface Media {
  public_id: string;
  secure_url: string;
  resource_type: "image" | "video";
}

interface IUser {
  _id: string;
  name: string;
  username: string;
  image: Media;
}

interface User extends IUser {
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface OnlineUser {
  socket_id: string;
  user_id: string;
}
