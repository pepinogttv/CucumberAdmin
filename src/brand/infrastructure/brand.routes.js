import makeExpressCallback from "../../shared/infrastructure/makeExpressCallback.js";
import { BrandController } from "./BrandController.js";


export const register = (router) => {
    router.get('/brands', makeExpressCallback(BrandController.getAll))
    router.post('/brands', makeExpressCallback(BrandController.create))
    router.put('/brands/:id', makeExpressCallback(BrandController.update))
    router.get('/brands/:id', makeExpressCallback(BrandController.getOne))
    router.delete('/brands/:id', makeExpressCallback(BrandController.deleteOne))
};

