import { pushNewMessage } from "@src/slices/messageSlice";
import { getRooms, updateRoom } from "@src/slices/roomSlice";
import { RootStore, store } from "@src/store/store";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "./SocketProvider";

export default function ChildProvider({ children }: { children: ReactNode }) {
  const { user } = useSelector((sx: RootStore) => sx.authSlice);
  // init get rooms
  useEffect(() => {
    if (user) {
      store.dispatch(getRooms(20));
    }
  }, [user]);

  // socket import
  const { socket } = useSocket();
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("receive_msg", (data: { message: Message; room: Room }) => {
      if (data.message && data.room) {
        dispatch(updateRoom(data.room));
        dispatch(pushNewMessage(data.message));
      }
    });
  }, [socket]);
  return children;
}
