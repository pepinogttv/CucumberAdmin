export const Category = ({
    username,
    encryptedPassword,
    salt,
}) => {
    return Object.freeze({
        username,
        password: encryptedPassword,
        salt
    })
}