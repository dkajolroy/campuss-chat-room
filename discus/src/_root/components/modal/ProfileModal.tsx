import { Avatar, Box, Button, Modal, TextField } from "@mui/material";
import { RootStore } from "@src/store/store";
import React from "react";
import { useSelector } from "react-redux";

interface Props {
  setProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  profileModal: boolean;
}
export default function ProfileModal({ profileModal, setProfileModal }: Props) {
  function handleClose() {
    setProfileModal(false);
  }

  const { user } = useSelector((sx: RootStore) => sx.authSlice);

  return (
    <Modal
      open={profileModal}
      onClose={handleClose}
      className="flex justify-center items-center"
    >
      <Box className="bg-white items-center flex flex-col max-w-md rounded p-2">
        <Avatar
          alt="Remy Sharp"
          src={user?.image.secure_url}
          sx={{ width: 56, height: 56 }}
          className="my-4"
        />
        <div className="flex flex-wrap gap-2">
          <TextField
            id="outlined-basic"
            size="small"
            value={user?.name}
            label="Name"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            size="small"
            value={user?.email}
            label="Email"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            size="small"
            value={user?.username}
            label="Username"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" fullWidth>
            Update
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
