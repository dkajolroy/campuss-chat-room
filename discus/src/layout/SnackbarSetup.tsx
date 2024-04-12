import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../slices/toggleSlice";
import { RootStore } from "../store/store";

export default function SnackbarSetup() {
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(closeSnackbar());
  }

  const toggleState = useSelector((s: RootStore) => s.toggleSlice);
  if (!toggleState) return;
  const { snackbar } = toggleState;
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      resumeHideDuration={2000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.mode}
        variant="filled"
        sx={{ width: "100%", maxWidth: "320px" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
