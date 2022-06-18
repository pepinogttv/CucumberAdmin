import makeExpressCallback from "../../shared/infrastructure/makeExpressCallback.js";
import { WholesalerController } from "./WholesalerController.js";

import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });


export const register = (router) => {
    router.get('/wholesalers', makeExpressCallback(WholesalerController.getAll));
    router.post('/wholesalers', upload.single('file'), makeExpressCallback(WholesalerController.create));
    router.put('/wholesalers/:id', upload.single('file'), makeExpressCallback(WholesalerController.update));
    router.get('/wholesalers/:id', makeExpressCallback(WholesalerController.getOne));
    router.delete('/wholesalers/:id', makeExpressCallback(WholesalerController.deleteOne));
};
