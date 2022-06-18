import makeExpressCallback from "../../shared/infrastructure/makeExpressCallback.js";
import { ProductController } from "./ProductController.js";

import multer from "multer";
import { reduceImageQuality } from "../../shared/infrastructure/middlewares/reduceImageQuality.js"
const upload = multer({ storage: multer.memoryStorage() });

export const register = (router) => {
    router.get('/products', makeExpressCallback(ProductController.getAll))
    router.post('/products', upload.array('files'), reduceImageQuality, makeExpressCallback(ProductController.create))
    router.put('/products/:id', upload.array('files'), reduceImageQuality, makeExpressCallback(ProductController.update))
    router.get('/products/:id', makeExpressCallback(ProductController.getOne))
    router.delete('/products/:id', makeExpressCallback(ProductController.deleteOne))

    // router.post('/products/:wholesalerId/sync-stock')
    // router.post('/products/:wholesalerId/sync-prices')

};
