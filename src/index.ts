import { dbConfig } from "@src/config/db_config";
import { authRoute } from "@src/routers/auth_route";
import { errorHandler } from "@src/utils/errorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";
import { configApp } from "./config/config";
import { auth } from "./middleware/auth.middleware";
import { messageRoute } from "./routers/message_route";
import { roomRoute } from "./routers/room_route";
import { userRoute } from "./routers/user_route";
import socket from "./socket/socket";

const app = express();
dbConfig();
const port = 5000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: configApp.frontend_url,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
// Routing config
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/message", auth, messageRoute);
app.use("/api/room", auth, roomRoute);

// static site
const root = path.resolve();
app.use(express.static(path.join(root, "/discus/dist")));
app.use("*", (req, res) => {
  res.sendFile(path.join(root, "/discus/dist/index.html"));
});

// socket server
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: configApp.frontend_url,
    credentials: true,
  },
});
socket(io);

// Http server
httpServer.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
// error handler
app.use(errorHandler);
