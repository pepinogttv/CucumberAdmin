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
const updateWholesalerProducts = makeUpdateWholesalerProducts({ wholesalerProductRepository, wholesalerProductsGetterRepository, dollarRepository, emitter, wholesalerAuthStateRepository });
const setWholesalerProductsAdditionalInfo = makeSetWholesalerProductsAdditionalInfo({ wholesalerProductRepository, wholesalerProductsGetterRepository, wholesalerAuthStateRepository, emitter });
const getWholesalerProductsFromOneWholesaler = makeGetWholesalerProductsFromOneWholesaler({ wholesalerProductRepository, dollarRepository });
const getWholesalerProducts = makeGetWholesalerProducts({ wholesalerProductsGetterRepository });
const getWholesalerProduct = makeGetWholesalerProduct({ wholesalerProductRepository, dollarRepository });


export const WholesalerProductController = Object.freeze({
    update: ({ body: { wholesaler, categories } }) => updateWholesalerProducts(wholesaler, false, categories),
    setAdditionalInfo: ({ body: { wholesaler } }) => setWholesalerProductsAdditionalInfo(wholesaler),
    getAll: getWholesalerProducts,
    getAllByWholesalerId: ({ params }) => getWholesalerProductsFromOneWholesaler(params.wholesalerId),
    getOne: ({ params }) => getWholesalerProduct(params.id),
})