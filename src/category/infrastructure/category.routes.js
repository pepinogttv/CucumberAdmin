import makeExpressCallback from "../../shared/infrastructure/makeExpressCallback.js";
import { CategoryController } from "./CategoryController.js";


export const register = (router) => {
    router.get('/categories', makeExpressCallback(CategoryController.getAll))
    router.post('/categories', makeExpressCallback(CategoryController.create))
    router.post('/categories/child', makeExpressCallback(CategoryController.createChild))
    router.put('/categories/:id', makeExpressCallback(CategoryController.update))
    router.get('/categories/:id', makeExpressCallback(CategoryController.getOne))
    router.delete('/categories/:id', makeExpressCallback(CategoryController.deleteOne))
};

