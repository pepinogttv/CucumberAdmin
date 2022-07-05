import { Server } from "socket.io";

export default (server) => new Server(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
});