import { combineSlices } from "@reduxjs/toolkit";
import authSlice from "@src/slices/authSlice";
import messageSlice from "@src/slices/messageSlice";
import roomSlice from "@src/slices/roomSlice";
import toggleSlice from "@src/slices/toggleSlice";
import userSlice from "@src/slices/userSlice";

export const rootReducer = combineSlices({
  authSlice,
  toggleSlice,
  roomSlice,
  messageSlice,
  userSlice,
});
