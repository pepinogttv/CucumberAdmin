import glob from "glob";
import { pathToFileURL } from "url";
import path from "path";
import { EventEmitter } from "events";

const __rootname = path.resolve('./');
const emitter = new EventEmitter();

async function registerEventListener(emitter, io) {
    const routes = glob.sync(__rootname + '/**/*.listeners.*');
    await Promise.all(routes.map(routePath => register(routePath, emitter, io)));
}

function register(routePath, emitter, io) {
    const path = pathToFileURL(routePath).href;
    return Promise.resolve(import(path).then(({ listeners }) => {
        Object.entries(listeners).forEach(([eventName, listenerCallback]) => emitter.on(eventName, listenerCallback(io)));
    }))
}

export { emitter, registerEventListener };