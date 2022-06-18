import makeExpressCallback from "../../shared/infrastructure/makeExpressCallback.js";
import { WholesalerProductController } from "./WholesalerProductController.js";

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
};
