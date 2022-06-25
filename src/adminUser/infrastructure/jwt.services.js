import jwt from 'jsonwebtoken';
const expiresIn = 1000 * 60 * 60 * 24 * 7;
const SECRET = process.env.SECRET || "MI-SECRET";

function decodeToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, (err, decodedToken) => {
            if (err) reject(err)
            resolve(decodedToken);
        })
    });
}

function encodeToken(info) {
    const token = jwt.sign(info, SECRET, { expiresIn });
    return token;
}

export {
    decodeToken,
    encodeToken
}

