import { encodeToken } from "./jwt.services.js";

export const tokenGenerator = Object.freeze({
    generate: ({ _id }) => encodeToken({ _id }),
})

