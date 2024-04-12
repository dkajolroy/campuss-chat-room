import { Close, CloudUpload, Settings } from "@mui/icons-material";

import SendIcon from "@mui/icons-material/Send";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  styled,
} from "@mui/material";
import { sendMessage } from "@src/slices/messageSlice";
import { store } from "@src/store/store";
import React, { useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { useParams } from "react-router-dom";
import GroupModal from "../modal/GroupModal";

export default function BottomToolbar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState<{ files: File[]; blobs: string[] }>({
    files: [],
    blobs: [],
  });
  function handleChangeImage({ target }: React.ChangeEvent<HTMLInputElement>) {
    const files = target.files as File[] | null;
    const blobs: string[] = [];
    const fileList: File[] = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const e = URL.createObjectURL(files[i]);
        blobs.push(e);
        fileList.push(files[i]);
      }
      setMedia((x) => ({ ...x, files: fileList, blobs }));
    }
    target.value = "";
  }
  function handleRemoveImage(index: number) {
    const newBlob = media.blobs.filter((_, i) => i !== index);
    const newFiles = media.files.filter((_, i) => i !== index);
    setMedia({ blobs: newBlob, files: newFiles });
  }

  // input text
  const [text, setText] = useState("");
  const { room_id } = useParams();
  const room = String(room_id);
  // const { socket } = useSocket();

  function handleOnEnter() {
    // use text message on enter
    if (room && (text || media.files.length)) {
      const f_data = new FormData();
      f_data.append("text", text);
      media.files.forEach((x) => f_data.append("images", x));
      store.dispatch(sendMessage({ form_input: f_data, room }));
      setText("");
      setMedia({ blobs: [], files: [] });
    }
  }

  // Group settings modal
  const [groupModal, setGroupModal] = useState(false);
  return (
    <React.Fragment>
      <AppBar
        elevation={2}
        color="inherit"
        sx={{ top: "auto", position: "sticky", bottom: 0 }}
      >
        <div className="absolute flex flex-wrap bottom-full min-w-40 left-0 z-20 bg-white ">
          {media.blobs.map((x, i) => (
            <div key={i} className="relative m-1 max-w-20">
              <IconButton
                className="!absolute top-0 right-0 z-10"
                onClick={() => handleRemoveImage(i)}
                size="small"
                sx={{ color: "white" }}
              >
                <Close />
              </IconButton>
              <img
                className="w-16 h-20 brightness-50  object-cover rounded"
                src={x}
                alt="media"
              />
            </div>
          ))}
        </div>
        <Toolbar className="!px-0">
          <Stack direction="row" width="100%">
            <IconButton
              onClick={() => inputRef.current?.click()}
              tabIndex={-1}
              role={undefined}
            >
              <CloudUpload />
              <VisuallyHiddenInput
                onChange={handleChangeImage}
                ref={inputRef}
                multiple
                maxLength={10}
                type="file"
                accept="image/*"
              />
            </IconButton>
            <InputEmoji
              shouldConvertEmojiToImage
              shouldReturn
              keepOpened={true}
              theme="light"
              inputClass="emoji-picker-input bottom-picker"
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="Type a message"
            />

            <Button
              size="small"
              sx={{
                borderColor: "lightgray",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              onClick={handleOnEnter}
              variant="outlined"
              color="inherit"
              startIcon={<SendIcon />}
            >
              Send
            </Button>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <GroupModal setGroupModal={setGroupModal} groupModal={groupModal} />
          <IconButton
            onClick={() => setGroupModal(true)}
            sx={{ mx: 1 }}
            color="inherit"
          >
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
