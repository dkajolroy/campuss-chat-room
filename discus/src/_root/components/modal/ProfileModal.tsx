import { CameraAlt } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  LinearProgress,
  Modal,
  TextField,
} from "@mui/material";
import { updateProfile } from "@src/slices/userSlice";
import { RootStore, store } from "@src/store/store";
import getCroppedImg, { base64ImageToBlob } from "@src/utils/image_cropper";
import React, { useEffect, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { useSelector } from "react-redux";

interface Props {
  setProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  profileModal: boolean;
}
export default function ProfileModal({ profileModal, setProfileModal }: Props) {
  const { user } = useSelector((sx: RootStore) => sx.authSlice);
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    username: "",
    blob: "",
    cropped: "",
  });
  useEffect(() => {
    if (user) {
      setData((x) => ({
        ...x,
        name: user.name,
        email: user.email,
        username: user.username,
      }));
    }
  }, [user]);

  // Image operations
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
  // show crop image
  async function cropImage() {
    const base = await getCroppedImg(data.cropped, croppedArea);
    setData((x) => ({ ...x, blob: "", cropped: String(base) }));
  }

  function handleClose() {
    setProfileModal(false);
  }

  const { isLoading } = useSelector((sx: RootStore) => sx.userSlice);
  // submit updates
  async function updateGroup() {
    if (data.cropped) {
      const imgFile = base64ImageToBlob(String(data.cropped)); // to file
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("username", data.username);
      formData.append("image", imgFile);
      // ready to Upload
      store.dispatch(
        updateProfile({
          input: formData,
          callback() {
            setData({
              name: "",
              email: "",
              username: "",
              blob: "",
              cropped: "",
            });
            handleClose();
          },
        })
      );
    } else {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("username", data.username);
      store.dispatch(
        updateProfile({
          input: formData,
          callback() {
            setData({
              name: "",
              email: "",
              username: "",
              blob: "",
              cropped: "",
            });
            handleClose();
          },
        })
      );
    }
  }

  return (
    <Modal
      open={profileModal}
      onClose={handleClose}
      className="flex justify-center items-center"
    >
      <>
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
                    onClick={cropImage}
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
              alt="User"
              src={data.cropped || user?.image.secure_url}
              sx={{ width: 56, height: 56 }}
              className="my-4"
            />
            <IconButton
              className="!absolute bottom-2 !p-1 -right-2"
              onClick={() => inputRef.current?.click()}
              sx={{ bgcolor: "Background" }}
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
          <LinearProgress className={`w-full ${!isLoading && "!hidden"}`} />
          <div className="flex flex-wrap gap-2 my-2">
            <TextField
              id="outlined-basic"
              size="small"
              value={data?.name}
              onChange={({ target }) =>
                setData((x) => ({ ...x, name: target.value }))
              }
              label="Name"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-basic"
              size="small"
              value={data?.email}
              onChange={({ target }) =>
                setData((x) => ({ ...x, email: target.value }))
              }
              label="Email"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-basic"
              size="small"
              value={data?.username}
              onChange={({ target }) =>
                setData((x) => ({ ...x, username: target.value }))
              }
              label="Username"
              variant="outlined"
              fullWidth
            />
            <Button onClick={updateGroup} variant="contained" fullWidth>
              Update
            </Button>
          </div>
        </Box>
      </>
    </Modal>
  );
}
