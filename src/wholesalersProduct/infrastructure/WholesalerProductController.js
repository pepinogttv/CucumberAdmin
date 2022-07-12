import { emitter } from "../../shared/infrastructure/eventEmitter/index.js";

import { makeUpdateWholesalerProducts } from "../application/UpdateWholesalerProducts.js";
import { makeSetWholesalerProductsAdditionalInfo } from "../application/SetWholesalerProductsAdditionalInfo.js";
import { makeGetWholesalerProductsFromOneWholesaler } from "../application/GetWhoProFromOneWholesaler.js";
import { makeGetWholesalerProducts } from "../application/GetWholesalerProducts.js";
import { makeGetWholesalerProduct } from "../application/GetWholesalerProduct.js";


import { repositoryFactory } from "./repositories/factory.js";
import { sharedRepositoryFactory } from "../../shared/infrastructure/repositories/factory.js";

const wholesalerProductRepository = repositoryFactory("wholesalerProductRepository");
const wholesalerProductsGetterRepository = repositoryFactory("wholesalerProductsGetterRepository");
const dollarRepository = sharedRepositoryFactory("dollarRepository");
const wholesalerAuthStateRepository = sharedRepositoryFactory("wholesalerAuthStateRepository");


//Make uses cases injecting dependencies
const updateProducts = makeUpdateWholesalerProducts({ wholesalerProductRepository, wholesalerProductsGetterRepository, dollarRepository, emitter, wholesalerAuthStateRepository });
const setAdditionalInfo = makeSetWholesalerProductsAdditionalInfo({ wholesalerProductRepository, wholesalerProductsGetterRepository, wholesalerAuthStateRepository, emitter });
const getProductsByWholesaler = makeGetWholesalerProductsFromOneWholesaler({ wholesalerProductRepository, dollarRepository });
const getProducts = makeGetWholesalerProducts({ wholesalerProductRepository, dollarRepository });
const getProduct = makeGetWholesalerProduct({ wholesalerProductRepository, dollarRepository });


export const WholesalerProductController = Object.freeze({
    update: ({ body: { wholesaler, categories } }) => updateProducts(wholesaler, false, categories),
    setAdditionalInfo: ({ body: { wholesaler, categories, forceReplace } }) => setAdditionalInfo(wholesaler, categories, forceReplace),
    getAll: getProducts,
    getAllByWholesalerId: ({ params }) => getProductsByWholesaler(params.wholesalerId),
    getOne: ({ params }) => getProduct(params.id),
})