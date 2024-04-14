import config from "@src/constants/config";
import { RootStore } from "@src/store/store";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";

interface ValueType {
  socket: Socket;
  onlineUser: OnlineUser[];
}

const connection = io(config.baseApiUrl);
const SocketContext = createContext<ValueType>({
  socket: connection,
  onlineUser: [],
});

export default function SocketProvider({ children }: { children: ReactNode }) {
  const { user } = useSelector((sx: RootStore) => sx.authSlice);
  const [data, setData] = useState<ValueType>({
    socket: connection,
    onlineUser: [],
  });
  useEffect(() => {
    // online user
    if (user) {
      data.socket.emit("join", user._id);
      data.socket.on("online_users", (users: OnlineUser[]) => {
        setData((sx) => ({ ...sx, onlineUser: users }));
      });
    }
  }, [user]);

  return (
    <SocketContext.Provider value={data}>{children}</SocketContext.Provider>
  );
}
// return to use socket
export const useSocket = () => {
  return useContext(SocketContext);
};
