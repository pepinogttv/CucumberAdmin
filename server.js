import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./src/shared/infrastructure/logger.js";
import { registerRoutes } from "./src/shared/infrastructure/routes/index.js";
import http from "http";

import {
  emitter,
  registerEventListener,
} from "./src/shared/infrastructure/eventEmitter/index.js";

import createIo from "./src/shared/infrastructure/socketio.js";
import { registerWebscoketEvents } from "./src/shared/infrastructure/webscoketEvents/index.js";

export function Server(port) {
  let httpServer;
  const app = express();
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false, limit: "100mb" }));
  app.use(express.json({ limit: "100mb" }));
  app.use(
    cors({
      origin: ["http://localhost:8080", "http://localhost:4000"],
      credentials: true,
    })
  );

  const router = express.Router();
  app.use(router);

  const server = http.createServer(app);
  const io = createIo(server);

  registerRoutes(router, app);
  registerEventListener(emitter, io);

  return {
    listen: () => {
      return new Promise((resolve) => {
        httpServer = server.listen(port, () => {
          io.on("connection", (socket) => {
            registerWebscoketEvents(socket);
          });
          logger.info(`Server listening on port ${port}`);
          resolve();
        });
      });
    },
    stop: () => {
      return new Promise((resolve, reject) => {
        if (!httpServer) return resolve();
        httpServer.close((err) => {
          if (err) reject(err);
          logger.info(`Server stopped`);
          resolve();
        });
      });
    },
  };
}
