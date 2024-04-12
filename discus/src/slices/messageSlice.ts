import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  axiosFormInstance,
  axiosJsonInstance,
  getCatchError,
} from "@src/utils/service";
import { AxiosError } from "axios";

interface Mes {
  [key: string]: Message[];
}
interface InitialState {
  isLoading: boolean;
  messages: Mes[];
}
const initialState: InitialState = {
  isLoading: false,
  messages: [],
};

const messageSlice = createSlice({
  name: "Message",
  initialState,
  reducers: {
    pushNewMessage(state, { payload }: PayloadAction<Message>) {
      const exist = state.messages.find((x) => x[payload.receiver]);
      if (exist) {
        // if exist messages
        const index = state.messages.findIndex((x) => x[payload.receiver]);
        state.messages[index][payload.receiver].push(payload);
      } else {
        // add new messages
        state.messages.push({ [payload.receiver]: [payload] });
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(getMessage.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        getMessage.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<{ room: string; data: Message[] } | undefined>
        ) => {
          state.isLoading = false;
          // console.log(payload);
          if (payload) {
            const exist = state.messages.find((x) => x[payload.room]);
            if (exist) {
              // replace saved message by keys
              const index = state.messages.findIndex((x) => x[payload.room]);
              state.messages[index] = { [payload.room]: payload.data };
            } else {
              // save message by room key
              state.messages.push({ [payload.room]: payload.data });
            }
          }
        }
      ),
      builder.addCase(getMessage.rejected, (state) => {
        state.isLoading = false;
      });

    // Send message builder
    builder.addCase(sendMessage.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(sendMessage.fulfilled, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(sendMessage.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { pushNewMessage } = messageSlice.actions;
export default messageSlice.reducer;
// Message apis

// get api
export const getMessage = createAsyncThunk(
  "message/get",
  async (
    { room, limit }: { room: string; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosJsonInstance.get(
        `/api/message/${room}?limit${limit}`
      );
      return { room, data };
    } catch (error) {
      const err = getCatchError(error as AxiosError);
      rejectWithValue(err);
    }
  }
);

// send api
export const sendMessage = createAsyncThunk(
  "message/send",
  async (
    { room, form_input }: { room: string; form_input: FormData },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosFormInstance.post(
        `/api/message/to/${room}`,
        form_input
      );
      return data;
    } catch (error) {
      const err = getCatchError(error as AxiosError);
      rejectWithValue(err);
    }
  }
);
