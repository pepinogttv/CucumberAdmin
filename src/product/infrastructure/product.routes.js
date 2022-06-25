import makeExpressCallback from "../../shared/infrastructure/makeExpressCallback.js";
import { ProductController } from "./ProductController.js";

import multer from "multer";
import { reduceImageQuality } from "../../shared/infrastructure/middlewares/reduceImageQuality.js"
import { authenticate } from "../../shared/infrastructure/middlewares/auth.js"
const upload = multer({ storage: multer.memoryStorage() });


export const register = (router) => {
    router.get('/products', makeExpressCallback(ProductController.getAll))
    router.get('/products/:id', makeExpressCallback(ProductController.getOne))

    router.post('/products', authenticate, upload.array('files'), reduceImageQuality, makeExpressCallback(ProductController.create))
    router.put('/products/:id', authenticate, upload.array('files'), reduceImageQuality, makeExpressCallback(ProductController.update))
    router.delete('/products/:id', authenticate, makeExpressCallback(ProductController.deleteOne))

    // router.post('/products/:wholesalerId/sync-stock')
    // router.post('/products/:wholesalerId/sync-prices')

};
