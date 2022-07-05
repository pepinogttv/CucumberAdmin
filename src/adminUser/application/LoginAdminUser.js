export function loginAdminUser({ adminUserRepository, passwordEncrypter, tokenGenerator }) {
    return async function (username, password) {
        const user = await adminUserRepository.getByUsername(username);
        if (!user) throw new Error(404);
        const { salt } = user;
        const encryptedPassword = await passwordEncrypter.encryptPassword(password, salt);
        if (encryptedPassword !== user.password) throw new Error('Incorrect password or username');
        const token = tokenGenerator.generate({ _id: user._id });
        return { token, user };
    }
}