import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  axiosFormInstance,
  axiosJsonInstance,
  getCatchError,
} from "@src/utils/service";
import { AxiosError } from "axios";
import { showSnackbar } from "./toggleSlice";

interface InitialState {
  isLoading: boolean;
  rooms: Room[];
  isUploading: boolean;
}
const initialState: InitialState = {
  isLoading: false,
  isUploading: false,
  rooms: [],
};

const roomSlice = createSlice({
  name: "Message",
  initialState,
  reducers: {
    updateRoom: (state, { payload }: PayloadAction<Room>) => {
      // find index and replace new
      const index = state.rooms.findIndex((x) => x._id === payload._id);
      [...state.rooms, (state.rooms[index] = payload)];
      // sorting by updateAt
      const newRooms = state.rooms.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      state.rooms = newRooms;
    },
    addNewRoom: (state, { payload }: PayloadAction<Room>) => {
      const exist = state.rooms.find((x) => x._id === payload._id);
      if (exist) return;
      state.rooms.push(payload);
      const newRooms = state.rooms.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      state.rooms = newRooms;
    },
  },
  extraReducers(builder) {
    builder.addCase(getRooms.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        getRooms.fulfilled,
        (state, { payload }: PayloadAction<Room[]>) => {
          state.isLoading = false;
          if (payload) {
            state.rooms = payload;
          }
        }
      ),
      builder.addCase(getRooms.rejected, (state) => {
        state.isLoading = false;
      });
    // Updating rooms
    builder.addCase(updateRooms.pending, (state) => {
      state.isUploading = true;
    }),
      builder.addCase(
        updateRooms.fulfilled,
        (state, { payload }: PayloadAction<Room>) => {
          state.isUploading = false;
          if (payload) {
            // find index of this rooms
            const index = state.rooms.findIndex((x) => x._id === payload._id);
            state.rooms[index] = payload;
          }
        }
      ),
      builder.addCase(updateRooms.rejected, (state) => {
        state.isUploading = false;
      });
  },
});
export const { updateRoom, addNewRoom } = roomSlice.actions;
export default roomSlice.reducer;
// Message apis

// room gets
export const getRooms = createAsyncThunk(
  "Room/get",
  async (limit: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosJsonInstance.get(
        `/api/room/all?limit${limit}`
      );
      return data;
    } catch (error) {
      const err = getCatchError(error as AxiosError);
      rejectWithValue(err);
    }
  }
);

// room update
export const updateRooms = createAsyncThunk(
  "Room/update",
  async (
    {
      room,
      formData,
      callback,
    }: { room: string; formData: FormData; callback: () => void },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { data } = await axiosFormInstance.put(
        `/api/room/update/${room}`,
        formData
      );
      dispatch(
        showSnackbar({
          message: data?.message,
          mode: "success",
        })
      );
      callback();
      return data?.room;
    } catch (error) {
      const err = getCatchError(error as AxiosError);
      rejectWithValue(err);
    }
  }
);
