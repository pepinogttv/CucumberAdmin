import glob from "glob";
import { pathToFileURL } from "url";
import path from "path";

const __rootname = path.resolve('./');

function register(routePath, io) {
    const path = pathToFileURL(routePath).href;
    import(path).then(route => route.register(io))
}

export function registerWebscoketEvents(io) {
    const routes = glob.sync(__rootname + '/**/*.webscoketEvents.*');
    routes.forEach(route => register(route, io));
}