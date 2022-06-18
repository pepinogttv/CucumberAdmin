import glob from "glob";
import { pathToFileURL } from "url";
import path from "path";

const __rootname = path.resolve('./');

function register(routePath, router) {
    const path = pathToFileURL(routePath).href;
    import(path).then(route => route.register(router))
}

export function registerRoutes(router) {
    const routes = glob.sync(__rootname + '/**/*.routes.*');
    routes.forEach(route => register(route, router));
}