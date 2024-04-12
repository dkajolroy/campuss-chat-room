import { Box, CircularProgress, CssBaseline, List } from "@mui/material";
import BottomToolbar from "@src/_root/components/discus/BottomToolbar";
import MessageItem from "@src/_root/components/discus/MessageItem";
import { getMessage } from "@src/slices/messageSlice";
import { RootStore, store } from "@src/store/store";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function DiscusPage() {
  const { room_id } = useParams();
  const scrollRef = useRef<HTMLUListElement>(null);
  const room = String(room_id);
  const { user } = useSelector((sx: RootStore) => sx.authSlice);
  const { isLoading, messages } = useSelector(
    (sx: RootStore) => sx.messageSlice
  );
  const msg = messages.find((x) => x[room]);

  useEffect(() => {
    if (!msg || msg[room].length < 30) {
      store.dispatch(getMessage({ limit: 30, room }));
    }
  }, [room_id]);
  // auto scrolling
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, room_id, isLoading]);

  return (
    <Box
      ref={scrollRef}
      className="relative max-h-screen overflow-y-auto transition-all"
    >
      <CssBaseline />
      <Box className="min-h-[calc(100vh-64px)]">
        <List>
          {msg &&
            msg[room].map((item, index) => {
              if (!user) return;
              return <MessageItem user={user} item={item} key={index} />;
            })}
          {isLoading && (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          )}
        </List>
      </Box>
      <BottomToolbar />
    </Box>
  );
}
