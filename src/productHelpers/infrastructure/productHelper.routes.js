import makeExpressCallback from "../../shared/infrastructure/makeExpressCallback.js";
import { ProductHelperController } from "./ProductHelperController.js"

export function register(router) {
    router.post('/product-helper/:name/search', makeExpressCallback(ProductHelperController.searchProduct));
    router.post('/product-helper/:name/get-product-images', makeExpressCallback(ProductHelperController.getProductImages));
}