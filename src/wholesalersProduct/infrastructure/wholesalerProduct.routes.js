import makeExpressCallback from "../../shared/infrastructure/makeExpressCallback.js";
import { WholesalerProductController } from "./WholesalerProductController.js";

import { authenticate } from "../../shared/infrastructure/middlewares/auth.js";
import { roleRequired } from "../../shared/infrastructure/middlewares/roleRequired.js";

export const register = (router) => {
    router.get('/wholesaler-products', authenticate, makeExpressCallback(
        WholesalerProductController.getAll
    ))
    router.get('/wholesaler-products/wholesaler/:wholesalerId', authenticate, makeExpressCallback(
        WholesalerProductController.getAllByWholesalerId,
        ({ body }) => ({ wholesalerId: body.wholesalerId })
    ))
    router.get('/wholesaler-products/product/:id', authenticate, makeExpressCallback(
        WholesalerProductController.getOne,
        ({ params }) => ({ id: params.id })
    ))
    router.post('/wholesaler-products/update-from-wholesaler', authenticate, roleRequired('owner'), makeExpressCallback(
        WholesalerProductController.update,
        ({ body }) => ({ wholesaler: body.wholesaler, categories: body.categories }),
    ));
    router.post('/wholesaler-products/set-additional-info-from-wholesaler', authenticate, roleRequired('owner'), makeExpressCallback(
        WholesalerProductController.setAdditionalInfo,
        ({ body }) => ({ wholesaler: body.wholesaler, categories: body.categories, forceReplace: body.forceReplace }),
    ));
};
