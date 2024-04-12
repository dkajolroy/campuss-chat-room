import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  useTheme,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import config from "@src/constants/config";
import { authSign } from "@src/slices/authSlice";
import { showSnackbar } from "@src/slices/toggleSlice";
import { store } from "@src/store/store";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function SignInForm() {
  const { palette } = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  // Handle form submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    }; // data

    if (!String(data.username).trim() || !String(data.password).trim())
      return dispatch(
        showSnackbar({
          message: "Email & Password is empty !",
          mode: "error",
        })
      );
    // // submit login
    store.dispatch(authSign({ mode: "sign-in", form_data: data }));
  };

  return (
    <Box flex={1} maxWidth={444} mx="auto">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: palette.primary.main }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome to {config.appName}
        </Typography>
        <Typography fontSize={14} color="GrayText">
          Please sign-in to your account and start the adventure
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            size="small"
            required
            fullWidth
            id="username"
            label="Username/Email"
            name="username"
            autoComplete="username"
            autoFocus
          />

          <TextField
            margin="normal"
            size="small"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              sx: { padding: 0 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={<Typography fontSize={14}>Remember me</Typography>}
              />
            </Grid>
            <Grid item>
              <Link to="/auth/forget">
                <Typography fontSize={14} sx={{ color: palette.primary.main }}>
                  Forgot password?
                </Typography>
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            // disabled={isLoading}
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            {/* {isLoading && (
              <CircularProgress sx={{ mr: 1 }} size={16} color="inherit" />
            )} */}
            Sign In
          </Button>
          <Grid container justifyContent="center" gap={1}>
            <Typography fontSize={14}>New on our platform?</Typography>
            <Link to="/auth/sign-up">
              <Typography fontSize={14} sx={{ color: palette.primary.main }}>
                Create an account
              </Typography>
            </Link>
          </Grid>
        </Box>
      </Box>

      <Box my={2}>
        <Divider>
          <Chip label="Or" size="small" />
        </Divider>
      </Box>
    </Box>
  );
}
