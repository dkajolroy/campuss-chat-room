import { Person } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  LinearProgress,
  List,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSocket } from "@src/providers/SocketProvider";
import { searchUsers, startChats } from "@src/slices/userSlice";
import { RootStore, store } from "@src/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserItem from "../search/UserItem";

interface Form {
  members: string[];
  isGroup: boolean;
  name: string;
}

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
}
export default function SearchModal({ openModal, setOpenModal }: Props) {
  const [text, setText] = useState(""); //search text
  function handleClose() {
    setOpenModal((x) => !x);
  }

  const { users, isLoading } = useSelector((sx: RootStore) => sx.userSlice);
  const { onlineUser } = useSocket();

  // live search
  useEffect(() => {
    const delay = setTimeout(() => {
      store.dispatch(searchUsers(text));
    }, 500);
    return () => clearTimeout(delay);
  }, [text]);

  // new chats
  const [form, setForm] = useState<Form>({
    members: [],
    isGroup: false,
    name: "",
  });
  const navigate = useNavigate();
  function startNewChats() {
    store.dispatch(
      startChats({
        input: form,
        navigate,
        callback() {
          handleClose();
        },
      })
    );
  }
  // remove members
  function removeMem() {
    setForm((sx) => ({ ...sx, members: [], name: "" }));
  }
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="justify-center items-center flex"
    >
      <Box className="bg-white max-w-lg rounded-sm p-5 gap-1 flex flex-col">
        <Stack justifyContent="space-between" flexDirection="row">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Users
          </Typography>
          <Stack alignItems="center" gap={2} flexDirection="row">
            <Badge color="secondary" badgeContent={form.members.length}>
              <Person />
            </Badge>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                setForm((s) => ({ ...s, isGroup: !s.isGroup }));
              }}
            >
              {form.isGroup ? "New Chat" : "New group"}
            </Button>
          </Stack>
        </Stack>
        {form.isGroup && (
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
          >
            <TextField
              onChange={({ target }) =>
                setForm((sx) => ({ ...sx, name: target.value }))
              }
              value={form.name}
              id="group"
              label="Group name"
              type="text"
              variant="outlined"
              size="small"
            />
            <Button onClick={removeMem} variant="contained" size="small">
              Reset
            </Button>
            <Button onClick={startNewChats} variant="contained" size="small">
              Create Group
            </Button>
          </Stack>
        )}
        <TextField
          onChange={({ target }) => setText(target.value)}
          fullWidth
          id="search"
          label="Search..."
          type="search"
          variant="outlined"
          size="small"
        />
        <LinearProgress className={`${!isLoading && "!hidden"}`} />
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {users.map((item, index) => {
            const online = onlineUser.find((x) => x.user_id === item._id);
            return (
              <UserItem
                setForm={setForm}
                setOpenModal={setOpenModal}
                form={form}
                item={item}
                online={Boolean(online)}
                key={index}
              />
            );
          })}
        </List>
      </Box>
    </Modal>
  );
}
