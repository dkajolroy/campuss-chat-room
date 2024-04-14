import {
  Divider,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSocket } from "@src/providers/SocketProvider";
import { formatTime } from "@src/utils/service";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OnlineAvatar from "./OnlineAvatar";
import OnlineMultiAvatar from "./OnlineMultiAvatar";

interface Props {
  item: Room;
  user: User;
}
export default function ChatRoom({ item, user }: Props) {
  const { room_id } = useParams();
  const { last_msg, updatedAt, name } = item;
  const meSender = last_msg?.sender?._id === user._id;
  const receiver = item.members.find((x) => x._id !== user._id);
  const { socket, onlineUser } = useSocket();
  // // is user online in this group
  const online = item.members.filter((x) => {
    const meN = onlineUser.filter((ee) => ee.user_id !== user._id);
    return meN.find((xx) => xx.user_id == x._id);
  });

  // navigation routing
  const navigate = useNavigate();
  function onClick() {
    navigate(`/${item._id}`);
  }
  // Join all room realtime updates
  useEffect(() => {
    if (user && item) {
      socket.emit("join_room", item._id);
    }
  }, [user, item]);

  return (
    <React.Fragment>
      <ListItemButton
        className="!relative"
        onClick={onClick}
        sx={{ bgcolor: room_id === item._id ? "ButtonShadow" : "initial" }}
      >
        <ListItemAvatar>
          {item.isGroup && !item.image ? (
            <OnlineMultiAvatar
              online={Boolean(online.length)}
              receivers={item.members}
            />
          ) : item.isGroup && item.image ? (
            <OnlineAvatar
              online={Boolean(online.length)}
              image={item.image.secure_url}
            />
          ) : (
            <OnlineAvatar
              online={Boolean(online.length)}
              image={receiver?.image.secure_url}
            />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={
            item.isGroup
              ? name ||
                item.members.map((x) => `${x.name.slice(0, 5)}-`).slice(0, 20)
              : receiver?.name
          }
          secondary={
            <Typography variant="caption" className="justify-between  flex">
              <span>
                {meSender ? "You: " : ""}
                {last_msg?.text.slice(0, 30)}
              </span>
              <span>{formatTime(updatedAt)}</span>
            </Typography>
          }
        />
      </ListItemButton>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
}
