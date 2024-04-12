import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useSocket } from "@src/providers/SocketProvider";
import { formatTime } from "@src/utils/service";
import OnlineAvatar from "./OnlineAvatar";

export default function MessageItem({
  item,
  user,
}: {
  item: Message;
  user: IUser;
}) {
  const myText = item.sender?._id === user._id;
  // online status
  const { onlineUser } = useSocket();
  const online = onlineUser.find((x) => x.user_id === item.sender._id);

  return (
    <ListItem
      sx={{
        py: 0.5,
        justifyContent: myText ? "end" : "start",
        flexDirection: myText ? "row-reverse" : "row",
      }}
    >
      {!myText && (
        <ListItemAvatar sx={{ justifyContent: "center", display: "flex" }}>
          {/* <Avatar alt={item.sender.name} src={item.sender.image.secure_url} /> */}
          <OnlineAvatar online={Boolean(online)} receiver={item.sender} />
        </ListItemAvatar>
      )}
      <Stack
        sx={{
          maxWidth: "80%",
          borderRadius: 1,
          bgcolor: "white",
          px: 1,
        }}
      >
        <ListItemText
          primary={
            <Stack
              direction={myText ? "row-reverse" : "row"}
              flexWrap="wrap"
              justifyContent="space-between"
            >
              <Typography fontSize={16} fontWeight="600">
                {myText ? "You" : `${item.sender.name}`}
              </Typography>
            </Stack>
          }
          secondary={
            <>
              {item.text}
              <div className="flex flex-wrap gap-1">
                {item.media.map((x, i) => (
                  <img
                    className="max-w-20 max-h-20 object-cover rounded"
                    src={x.secure_url}
                    key={i}
                    alt="media"
                  />
                ))}
              </div>
              <Typography
                fontSize={12}
                component="span"
                variant="body2"
                color="text.secondary"
                display="block"
                textAlign={myText ? "left" : "right"}
              >
                {/* {moment(item.createdAt).fromNow()} */}
                {formatTime(item.createdAt)}
              </Typography>
            </>
          }
        />
      </Stack>
    </ListItem>
  );
}
