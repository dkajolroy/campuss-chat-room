import SearchIcon from "@mui/icons-material/Search";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";

import { Person } from "@mui/icons-material";
import {
  Box,
  Button,
  List,
  Skeleton,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";
import { logout } from "@src/slices/authSlice";
import { RootStore } from "@src/store/store";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "../modal/ProfileModal";
import SearchModal from "../modal/SearchModal";
import ChatRoom from "./ChatRoom";

export default function ChatSidebar() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = React.useState(false);
  function onLogout() {
    dispatch(logout());
  }
  const { rooms, isLoading } = useSelector((sx: RootStore) => sx.roomSlice);
  const { user } = useSelector((sx: RootStore) => sx.authSlice);

  // const { onlineUser, socket } = useSocket();

  // console.log(onlineUser);

  // var tDay_list: Conversation[] = [];
  // var yDay_list: Conversation[] = [];
  // var oDay_list: Conversation[] = [];
  const [profileModal, setProfileModal] = React.useState(false);
  return (
    <React.Fragment>
      <CssBaseline />
      <SearchModal openModal={openModal} setOpenModal={setOpenModal} />
      <>
        <Box className="min-h-screen relative">
          <Toolbar sx={{ flexDirection: "column", alignItems: "start" }}>
            <Typography variant="h2" fontSize={24} fontWeight="bold">
              discuss
            </Typography>
            <Search onClick={() => setOpenModal(true)}>
              <SearchIconWrapper>
                <SearchIcon color="disabled" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>

          {!rooms.length && !isLoading && (
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: "50vh" }}
            >
              <Typography variant="overline" fontSize={16}>
                Empty conversation
              </Typography>
            </Stack>
          )}

          <List>
            {rooms.map((item, index) => {
              if (!user) return;
              // const today = moment(new Date()).format("DD MM YY");
              // const yesterday = moment(new Date())
              //   .subtract(1, "day")
              //   .format("DD MM YY");

              // const itemDate = moment(item.updatedAt).format("DD MM YY");
              // const isToday = itemDate === today;
              // const isYesterday = itemDate === yesterday;
              // condition for one time render list header
              // if (isToday && tDay_list.length < 3) tDay_list.push(item);
              // if (isYesterday && yDay_list.length < 3) yDay_list.push(item);
              // if (!isYesterday && !isToday && oDay_list.length < 3)
              //   oDay_list.push(item);
              return (
                <React.Fragment key={index}>
                  {/* {isToday &&
                  tDay_list.length < 2 && ( // < 5
                    <ListSubheader sx={{ bgcolor: "background.paper" }}>
                      Today
                    </ListSubheader>
                  )}
                {isYesterday &&
                  yDay_list.length < 2 && ( //   > 5
                    <ListSubheader sx={{ bgcolor: "background.paper" }}>
                      Yesterday
                    </ListSubheader>
                  )}
                {!isYesterday &&
                  !isToday &&
                  oDay_list.length < 2 && ( //   > 5
                    <ListSubheader sx={{ bgcolor: "background.paper" }}>
                      Older
                    </ListSubheader>
                  )} */}
                  <ChatRoom item={item} user={user} />
                </React.Fragment>
              );
            })}
          </List>
          {isLoading ? (
            <Stack gap={1}>
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton variant="rounded" width="100%" height={50} key={i} />
              ))}
            </Stack>
          ) : null}
          <ProfileModal
            profileModal={profileModal}
            setProfileModal={setProfileModal}
          />
          <Toolbar className="!absolute w-full bottom-0 left-0 gap-1">
            <Button onClick={() => setProfileModal(true)} variant="outlined">
              <Person />
            </Button>
            <Button onClick={onLogout} variant="contained" fullWidth>
              Logout
            </Button>
          </Toolbar>
        </Box>
      </>
    </React.Fragment>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));
