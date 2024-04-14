import { Server } from "socket.io";
import { addOnlineUser, onlineUsers, removeOnlineUser } from "./store";

export default function socket(io: Server) {
  io.on("connection", (socket) => {
    // online offline
    socket.on("join", (user: string) => {
      if (user) {
        addOnlineUser({ socket_id: socket.id, user_id: user });
      }
      io.emit("online_users", onlineUsers);
    });
    // Typing status
    socket.on("typing", (value: TypingValue) => {
      io.to(value.room).emit("typing_res", value);
    });

    // join to room
    socket.on("join_room", (room) => {
      socket.join(room);
    });

    // disconnect user
    socket.on("disconnect", () => {
      removeOnlineUser(socket.id);
      io.emit("online_users", onlineUsers);
    });
  });
}

interface TypingValue {
  name: string;
  _id: string;
  status: boolean;
  room: string;
}
