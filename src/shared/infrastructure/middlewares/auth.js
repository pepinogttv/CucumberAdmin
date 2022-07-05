import { repositoryFactory } from "../../../adminUser/infrastructure/repositories/factory.js";
const adminUserRepository = repositoryFactory("adminUserRepository");
import { decodeToken } from "../../../adminUser/infrastructure/jwt.services.js"

// const production = process.env.NODE_ENV === "production";
const production = false;
export async function authenticate(req, res, next) {
    if (!production) return next();

    let { token } = req.cookies;
    if (!token) token = req.headers.authorization ? req.headers.authorization?.split(' ')[1] : null

    if (!token) return res.status(403).json({ message: 'Unauthorized' });

    try {
        const decodedToken = await decodeToken(token);
        const { _id } = decodedToken;
        const adminUser = await adminUserRepository.getById(_id);
        req.adminUser = adminUser;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Unauthorized' });
    }
}