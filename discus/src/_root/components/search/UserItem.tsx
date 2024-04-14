import CommentIcon from "@mui/icons-material/Comment";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import OnlineAvatar from "@src/_root/components/discus/OnlineAvatar";
import { startChats } from "@src/slices/userSlice";
import { RootStore, store } from "@src/store/store";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Form {
  members: string[];
  isGroup: boolean;
  name: string;
}

export default function UserItem({
  item,
  online,
  setForm,
  setOpenModal,
  form,
}: {
  item: User;
  online: boolean;
  form: Form;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
}) {
  // new chats
  const { user } = useSelector((sx: RootStore) => sx.authSlice);
  const navigate = useNavigate();
  function startNewChats() {
    store.dispatch(
      startChats({
        input: { ...form, members: [item._id], name: "" },
        navigate,
        callback() {
          setOpenModal((x) => !x);
        },
      })
    );
  }

  // handler members
  function handleMembers() {
    const isMem = form.members.includes(item._id);
    if (isMem) {
      const removeMem = form.members.filter((x) => x !== item._id);
      setForm((sx) => ({ ...sx, members: removeMem }));
    } else {
      setForm((sx) => ({ ...sx, members: [...sx.members, item._id] }));
    }
  }
  return (
    <ListItem
      className="min-w-[300px]"
      secondaryAction={
        <>
          {form.isGroup ? (
            <Checkbox
              edge="end"
              onChange={handleMembers}
              disabled={item._id === user?._id}
            />
          ) : (
            <IconButton
              onClick={startNewChats}
              edge="end"
              disabled={item._id === user?._id}
              aria-label="comments"
            >
              <CommentIcon />
            </IconButton>
          )}
        </>
      }
      alignItems="flex-start"
    >
      <ListItemAvatar>
        <OnlineAvatar online={Boolean(online)} image={item.image.secure_url} />
      </ListItemAvatar>
      <ListItemText
        primary={item.name}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {item.username}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
