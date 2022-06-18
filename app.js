import { Server } from "./server.js";

const port = process.env.PORT || 3000;

export const App = (server = Server(port)) => ({
    start: () => {
        return server.listen(port)
    },
    stop: () => {
        return server.close()
    },
    getPort: () => server.port,
    getServer: () => server.httpServer
})

