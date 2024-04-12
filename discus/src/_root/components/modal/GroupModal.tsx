import { Avatar, Box, Button, Modal, TextField } from "@mui/material";
import React from "react";

interface Props {
  setGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
  groupModal: boolean;
}
export default function GroupModal({ groupModal, setGroupModal }: Props) {
  function handleClose() {
    setGroupModal(false);
  }

  return (
    <Modal
      open={groupModal}
      onClose={handleClose}
      className="flex justify-center items-center"
    >
      <Box className="bg-white items-center flex flex-col max-w-md rounded p-2">
        <Avatar
          alt="Remy Sharp"
          src=""
          sx={{ width: 56, height: 56 }}
          className="my-4"
        />
        <div className="flex flex-wrap gap-2">
          <TextField
            id="outlined-basic"
            size="small"
            label="Group Name"
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
