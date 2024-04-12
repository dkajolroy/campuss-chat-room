import { Box, CssBaseline, Stack, SxProps, Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import ChatSidebar from "@src/_root/components/discus/ChatSidebar";
import { RootStore } from "@src/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useParams } from "react-router-dom";

export default function RootLayout() {
  const { user } = useSelector((sx: RootStore) => sx.authSlice);

  const isTablet = useMediaQuery("(max-width:768px)");
  const { room_id } = useParams();
  if (!user) {
    return <Navigate to="/auth/sign-in" />;
  } else {
    return (
      <>
        <CssBaseline />
        <>
          <Stack direction="row">
            <Box
              display={room_id && isTablet ? "none" : "block"}
              sx={{
                width: "100%",
                background: "white",
                maxWidth: isTablet ? "100%" : 350,
              }}
            >
              <Box sx={sidebarBoxSx}>
                <Box px={1}>
                  <ChatSidebar />
                </Box>
              </Box>
            </Box>
            <Box
              display={isTablet && !room_id ? "none" : "block"}
              sx={{
                width: "100%",
                bgcolor: "ButtonHighlight",
                position: "relative",
              }}
            >
              <Outlet />
            </Box>
          </Stack>
        </>
      </>
    );
  }
}

type SX = SxProps<Theme> | undefined;
const sidebarBoxSx: SX = {
  bgcolor: "background.paper",
  borderRadius: 1,
  position: "sticky",
  top: 0,
  left: 0,
  right: 0,
};
