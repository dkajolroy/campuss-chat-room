import config from "@src/constants/config";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";

export const axiosJsonInstance = axios.create({
  baseURL: config.baseApiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosFormInstance = axios.create({
  baseURL: config.baseApiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export function getCatchError(error: AxiosError) {
  const err = (error.response?.data as { message: string }) || error;
  return err.message;
}

export function formatTime(date: string) {
  const now = dayjs();
  const msg_date = dayjs(date);

  if (now.diff(msg_date, "minute") < 1) return "Just now";
  if (now.diff(msg_date, "hour") < 1)
    return `${now.diff(msg_date, "minute")} minutes ago`;
  if (now.diff(msg_date, "day") < 1) return msg_date.format("hh:mm: A");

  return msg_date.format("MMM DD");
}
