import makeExpressCallback from "../../shared/infrastructure/makeExpressCallback.js";
import { CategoryController } from "./CategoryController.js";
import { authenticate } from "../../shared/infrastructure/middlewares/auth.js"


export const register = (router) => {
    router.get('/categories', makeExpressCallback(CategoryController.getAll))
    router.get('/categories/:id', makeExpressCallback(CategoryController.getOne))

    router.post('/categories', authenticate, makeExpressCallback(CategoryController.create))
    router.post('/categories/child', authenticate, makeExpressCallback(CategoryController.createChild))
    router.put('/categories/:id', authenticate, makeExpressCallback(CategoryController.update))
    router.delete('/categories/:id', authenticate, makeExpressCallback(CategoryController.deleteOne))
};

