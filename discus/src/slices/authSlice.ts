import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosJsonInstance, getCatchError } from "@src/utils/service";
import { AxiosError } from "axios";
import { showSnackbar } from "./toggleSlice";

interface Init {
  isLoading: boolean;
  user: User | null;
}

const initialState: Init = {
  isLoading: false,
  user: null,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      window.location.href = "/";
    },
  },
  extraReducers(builder) {
    builder.addCase(authSign.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      authSign.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(authSign.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;

interface FormInput {
  form_data: any;
  mode: "sign-in" | "sign-up";
}
// auth api
export const authSign = createAsyncThunk(
  "auth/sign",
  async ({ form_data, mode }: FormInput, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosJsonInstance.post(
        `/api/auth/${mode}`,
        form_data
      );
      dispatch(
        showSnackbar({
          message: data?.message,
          mode: "success",
        })
      );
      return data?.user;
    } catch (error) {
      const err = getCatchError(error as AxiosError);
      dispatch(
        showSnackbar({
          message: err,
          mode: "error",
        })
      );
      rejectWithValue(err);
    }
  }
);
