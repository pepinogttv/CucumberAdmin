import { Server } from "socket.io";
import http from "http";

export default (server) => new Server(server);
