export function makeCreateAdminUser({ adminUserRepository, passwordEncrypter, tokenGenerator }) {
    return async function (username, password) {
        if (!username || !password) throw new Error("username and password are required");
        const user = await adminUserRepository.getByUsername(username);
        if (user) throw new Error('El usuario ya existe');
        const salt = await passwordEncrypter.generateSalt();
        const encryptedPassword = await passwordEncrypter.encryptPassword(password, salt);
        const newAdminUser = await adminUserRepository.create({
            username,
            password: encryptedPassword,
            salt,
            role: 'admin',
        })
        const token = tokenGenerator.generate({ _id: newAdminUser._id });
        return { token };
    }
}