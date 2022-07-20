import { encodeToken } from "./jwt.services.js";

export const tokenGenerator = Object.freeze({
    generate: (info) => encodeToken(info),
})

