import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosJsonInstance, getCatchError } from "@src/utils/service";
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { updateUser } from "./authSlice";
import { addNewRoom } from "./roomSlice";
import { showSnackbar } from "./toggleSlice";

interface Init {
  users: User[];
  isLoading: boolean;
}

const initialState: Init = {
  users: [],
  isLoading: false,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(searchUsers.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        searchUsers.fulfilled,
        (state, { payload }: PayloadAction<User[]>) => {
          state.isLoading = false;
          state.users = payload;
        }
      ),
      builder.addCase(searchUsers.rejected, (state) => {
        state.isLoading = false;
      });
    // Start chat
    builder.addCase(startChats.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(startChats.fulfilled, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(startChats.rejected, (state) => {
        state.isLoading = false;
      });
    // Update users
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(updateProfile.fulfilled, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(updateProfile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export default userSlice.reducer;

export const searchUsers = createAsyncThunk(
  "User/search",
  async (text: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosJsonInstance.get(
        `/api/user/search?text=${text}`
      );
      return data;
    } catch (error) {
      rejectWithValue(getCatchError(error as AxiosError));
    }
  }
);

interface InputForm {
  callback: () => void;
  navigate: NavigateFunction;
  input: Object;
}
// start chats
export const startChats = createAsyncThunk(
  "User/chats",
  async (
    { input, navigate, callback }: InputForm,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { data } = await axiosJsonInstance.post(`/api/room/new`, input);
      if (data.room) {
        dispatch(addNewRoom(data?.room));
        navigate(`/${data.room?._id}`); // go to exist chats
        callback();
      } else {
        dispatch(
          showSnackbar({
            mode: "success",
            message: data?.message,
          })
        );
      }
    } catch (error) {
      rejectWithValue(getCatchError(error as AxiosError));
    }
  }
);

// updates
export const updateProfile = createAsyncThunk(
  "User/update",
  async (
    { input, callback }: { input: FormData; callback: () => void },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { data } = await axiosJsonInstance.put(`/api/user/update`, input);
      callback();
      dispatch(
        showSnackbar({
          mode: "success",
          message: data?.message,
        })
      );
      dispatch(updateUser(data?.user));
    } catch (error) {
      rejectWithValue(getCatchError(error as AxiosError));
    }
  }
);
