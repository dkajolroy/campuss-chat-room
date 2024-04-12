import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import config from "@src/constants/config";
import { RootStore } from "@src/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const theme = useTheme();
  const { user } = useSelector((sx: RootStore) => sx.authSlice);

  // Authenticate middleware
  if (user) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="min-h-screen flex items-center">
        <Container component="main">
          <Grid container gap={10}>
            <Box
              sx={{
                borderRadius: 5,
                display: { md: "flex", xs: "none", flexDirection: "column" },
                justifyContent: "center",
                alignItems: "center",
                bgcolor: theme.palette.primary.main,
              }}
              flex={{ lg: 2, md: 1 }}
            >
              <Typography
                sx={{ color: "white" }}
                fontSize={32}
                fontWeight="bold"
              >
                Join {config.appName}
              </Typography>
              <Typography align="center" fontSize={14} sx={{ color: "white" }}>
                The best social media platform of <br /> Bangladesh
              </Typography>
              <Box
                sx={{
                  bgcolor: "white",
                  mt: 5,
                  mb: 1,
                  py: 0.5,
                  px: 1,
                  borderRadius: 5,
                }}
              >
                Facebook
              </Box>
              <Typography sx={{ color: "white" }} fontSize={14}>
                {config.appName} Terms and condition
              </Typography>
              <Typography sx={{ color: "lightgray" }} fontSize={14}>
                v{config.version}
              </Typography>
            </Box>
            {/* Auth Form  */}
            <Outlet />
          </Grid>
        </Container>
      </div>
    );
  }
}
