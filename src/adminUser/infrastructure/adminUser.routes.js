import makeExpressCallback from "../../shared/infrastructure/makeExpressCallback.js";

import { AdminUserController } from "./AdminUserController.js";
import { authenticate } from "../../shared/infrastructure/middlewares/auth.js";
import { roleRequired } from "../../shared/infrastructure/middlewares/roleRequired.js";

export const register = (router) => {
    router.post('/admin-users', authenticate, roleRequired('owner'), makeExpressCallback(AdminUserController.create));
    router.get('/admin-users', authenticate, roleRequired('owner'), makeExpressCallback(AdminUserController.getAll));
    router.post('/admin-users/login', authenticate, makeExpressCallback(AdminUserController.login));
};

