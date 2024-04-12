import { OnlineUser } from "@src/types/data";

// online users
export var onlineUsers: OnlineUser[] = [];

// get online user
export function getOnlineUser(socketId: string) {
  return onlineUsers.find((x) => x.socket_id === socketId);
}
// remove online user
export function removeOnlineUser(socketId: string) {
  onlineUsers = onlineUsers.filter((x) => x.socket_id !== socketId);
}
// add onlineUser
export function addOnlineUser(data: OnlineUser) {
  onlineUsers.push(data);
}
