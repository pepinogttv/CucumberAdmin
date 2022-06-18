import express from "express";
import cors from "cors";
import logger from "./src/shared/infrastructure/logger.js"
import { registerRoutes } from "./src/shared/infrastructure/routes/index.js";
import http from "http";

import { emitter, registerEventListener } from "./src/shared/infrastructure/eventEmitter/index.js";

import SocketIoServer from "./src/shared/infrastructure/socketio.js";
import { registerWebscoketEvents } from "./src/shared/infrastructure/webscoketEvents/index.js";

import path from "path";

export const Server = (port) => {
    let httpServer;
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    const router = express.Router();
    app.use(router)

    const server = http.createServer(app);
    const io = SocketIoServer(server);

    registerRoutes(router, app);
    registerEventListener(emitter);

    app.get('/', (req, res) => {
        res.sendFile(path.join(process.cwd(), 'index.html'));
    })

    return ({
        listen: () => {
            return new Promise(resolve => {
                httpServer = server.listen(port, () => {
                    io.on('connection', socket => registerWebscoketEvents(socket))
                    logger.info(`Server listening on port ${port}`);
                    resolve();
                });
            })
        },
        stop: () => {
            return new Promise((resolve, reject) => {
                if (!httpServer) return resolve()
                httpServer.close(err => {
                    if (err) reject(err);
                    logger.info(`Server stopped`);
                    resolve();
                })
            })
        }
    })
}

// export class Server {
//     httpServer;
//     constructor(port) {
//         this.port = port;
//         this.logger = logger;
//         this.express = express();
//         this.express.use(express.json());
//         this.express.use(express.urlencoded({ extended: true }));
//         const router = express.Router();
//         this.express.use(router)
//         registerRoutes(router);
//     }
//     async listen() {
//         return new Promise(resolve => {
//             this.httpServer = this.express.listen(this.port, () => {
//                 this.logger.info(`Server listening on port ${this.port}`);
//                 resolve();
//             });
//         })
//     }
//     async stop() {
//         return new Promise((resolve, reject) => {
//             if (!this.httpServer) return resolve()
//             this.httpServer.close(err => {
//                 if (err) reject(err);
//                 this.logger.info(`Server stopped`);
//                 resolve();
//             })
//         })
//     }
// }