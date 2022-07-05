import makeExpressCallback from "../../shared/infrastructure/makeExpressCallback.js";
import { WholesalerProductController } from "./WholesalerProductController.js";

import { authenticate } from "../../shared/infrastructure/middlewares/auth.js";
import { roleRequired } from "../../shared/infrastructure/middlewares/roleRequired.js";

export const register = (router) => {
    router.get('/wholesaler-products', makeExpressCallback(
        WholesalerProductController.getAll
    ))
    router.get('/wholesaler-products/wholesaler/:wholesalerId', makeExpressCallback(
        WholesalerProductController.getAllByWholesalerId
    ))
    router.get('/wholesaler-products/product/:id', makeExpressCallback(
        WholesalerProductController.getOne
    ))
    router.post('/update-wholesaler-products', authenticate, roleRequired('owner'), makeExpressCallback(
        WholesalerProductController.update
    ));
    router.post('/set-wholesaler-products-additional-info', authenticate, roleRequired('owner'), makeExpressCallback(
        WholesalerProductController.setAdditionalInfo
    ));
};
