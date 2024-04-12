import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  snackbar: {
    open: boolean;
    mode: AlertColor;
    message: string;
  };
}

const initialState: InitialState = {
  snackbar: {
    open: false,
    mode: "success",
    message: "",
  },
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    showSnackbar(
      state,
      { payload }: PayloadAction<{ mode: AlertColor; message: string }>
    ) {
      const data = {
        open: true,
        mode: payload.mode,
        message: payload.message,
      };
      state.snackbar = data;
    },
    closeSnackbar(state) {
      const data = {
        open: false,
        mode: state.snackbar.mode,
        message: "",
      };
      state.snackbar = data;
    },
  },
});

export const { closeSnackbar, showSnackbar } = toggleSlice.actions;
export default toggleSlice.reducer;
