import crypto from "crypto"


export const passwordEncrypter = Object.freeze({
    generateSalt: () => new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, salt) => {
            if (err) return reject(err);
            resolve(salt.toString("base64"));
        })
    }),
    encryptPassword: (password, salt) => new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 10000, 64, "sha1", (err, key) => {
            if (err) return reject(err);
            resolve(key.toString("base64"));
        })
    })
})