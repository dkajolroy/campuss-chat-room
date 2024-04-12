export interface UploadMedia {
  public_id: string;
  secure_url: string;
  resource_type: "image" | "video";
}

export interface OnlineUser {
  socket_id: string;
  user_id: string;
}
