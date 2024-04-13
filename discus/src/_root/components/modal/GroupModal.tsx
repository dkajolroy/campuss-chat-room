import { CameraAlt } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import getCroppedImg, { base64ImageToBlob } from "@src/utils/image_cropper";
import React, { useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

interface Props {
  setGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
  groupModal: boolean;
}
export default function GroupModal({ groupModal, setGroupModal }: Props) {
  function handleClose() {
    setGroupModal(false);
  }

  const inputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    name: "",
    blob: "",
    cropped: "",
  });
  function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files;
    if (file) {
      const blob = URL.createObjectURL(file[0]);
      setData((x) => ({ ...x, blob, cropped: blob }));
    }
    event.target.value = "";
  }
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const onCropComplete = async (_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };

  // update group
  async function updateGroup() {
    if (data.cropped) {
      const base = await getCroppedImg(data.cropped, croppedArea);
      const imgFile = base64ImageToBlob(String(base)); // to file
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("image", imgFile);
      // ready to Upload
    } else {
      // without image
      // Upload
    }
  }

  return (
    <Modal
      open={groupModal}
      onClose={handleClose}
      className="flex justify-center items-center"
    >
      <Box className="bg-white mx-auto relative items-center  flex flex-col max-w-md rounded p-2">
        {data.blob && (
          <div className="bg-white absolute w-full h-full z-10  top-0 pt-2 rounded">
            <div className="relative h-full">
              <div className="absolute bg-white top-0 left-1/2 -translate-x-1/2 z-20 w-11/12  h-full">
                <Cropper
                  image={data.blob}
                  crop={crop}
                  zoom={zoom}
                  aspect={1 / 1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <div className="flex w-full gap-2 absolute p-2 bg-white top-full z-30">
                <Button
                  onClick={() => setData((x) => ({ ...x, blob: "" }))}
                  variant="contained"
                  size="small"
                  fullWidth
                >
                  Crop
                </Button>
                <Button
                  onClick={() =>
                    setData((x) => ({ ...x, blob: "", cropped: "" }))
                  }
                  variant="contained"
                  size="small"
                  fullWidth
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        )}
        <Box className="!relative">
          <Avatar
            alt="Remy Sharp"
            src=""
            sx={{ width: 56, height: 56 }}
            className="my-4"
          />
          <IconButton
            className="!absolute bottom-2 -right-2"
            onClick={() => inputRef.current?.click()}
          >
            <CameraAlt />
          </IconButton>
          <input
            onChange={handleChangeImage}
            type="file"
            hidden
            accept="image/*"
            ref={inputRef}
          />
        </Box>
        <div className="flex flex-wrap gap-2">
          <TextField
            id="outlined-basic"
            size="small"
            label="Group Name"
            variant="outlined"
            fullWidth
            value={data.name}
            onChange={({ target }) =>
              setData((xx) => ({ ...xx, name: target.value }))
            }
          />

          <Button onClick={updateGroup} variant="contained" fullWidth>
            Update
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
