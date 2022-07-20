import makeExpressCallback from "../../shared/infrastructure/makeExpressCallback.js";

import { AdminUserController } from "./AdminUserController.js";
import { authenticate } from "../../shared/infrastructure/middlewares/auth.js";
import { roleRequired } from "../../shared/infrastructure/middlewares/roleRequired.js";

export const register = (router) => {
    router.post('/admin-users',
        authenticate,
        roleRequired('owner'),
        makeExpressCallback(
            AdminUserController.create,
            function ({ body }) {
                return {
                    username: body.username,
                    password: body.password,
                    email: body.email,
                }
            }
        )
    )
    router.post('/admin-users/login',
        makeExpressCallback(
            AdminUserController.login,
            function ({ body }) {
                return {
                    username: body.username,
                    password: body.password,
                }
            }
        )
    );
    router.get('/admin-users',
        authenticate,
        roleRequired('owner'),
        makeExpressCallback(AdminUserController.getAll)
    );
    router.get('/admin-users/profile',
        authenticate,
        roleRequired('admin'),
        makeExpressCallback(
            AdminUserController.getOne,
            function ({ user }) {
                return {
                    id: user._id
                }
            }
        )
    );
};

