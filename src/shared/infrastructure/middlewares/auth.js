import { repositoryFactory } from "../../../adminUser/infrastructure/repositories/factory.js";
const adminUserRepository = repositoryFactory("adminUserRepository");
import { decodeToken } from "../../../adminUser/infrastructure/jwt.services.js"

export async function authenticate(req, res, next) {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (!token) return res.status(403).json({ message: 'Unauthorized' });

    try {
        const decodedToken = await decodeToken(token);
        const { _id } = decodedToken;
        const adminUser = await adminUserRepository.getById(_id);
        req.adminUser = adminUser;
        next();
    } catch (err) {
        res.sendStatus(500)
    }
}