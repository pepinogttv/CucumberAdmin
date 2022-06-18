import makeUseCase from "../../shared/application/makeUseCase.js";

import { updateWholesalerProducts } from "../application/UpdateWholesalerProducts.js";
import { setWholesalerProductsAdditionalInfo } from "../application/SetWholesalerProductsAdditionalInfo.js";
import { getWholesalerProductsFromOneWholesaler } from "../application/GetWhoProFromOneWholesaler.js";
import { getWholesalerProducts } from "../application/GetWholesalerProducts.js";
import { getWholesalerProduct } from "../application/GetWholesalerProduct.js";


import { repositoryFactory } from "./repositories/factory.js";
import { sharedRepositoryFactory } from "../../shared/infrastructure/repositories/factory.js";

const wholesalerProductRepository = repositoryFactory("wholesalerProductRepository");
const wholesalerProductsGetterRepository = repositoryFactory("wholesalerProductsGetterRepository");
const dollarRepository = sharedRepositoryFactory("dollarRepository");


export const WholesalerProductController = Object.freeze({
    update: ({ wholesaler, updateCallback, endCallback }) => makeUseCase(
        updateWholesalerProducts,
        wholesalerProductRepository,
        wholesalerProductsGetterRepository,
        dollarRepository
    )(wholesaler, updateCallback, endCallback),
    setAdditionalInfo: ({ wholesaler, updateCallback, endCallback }) => makeUseCase(
        setWholesalerProductsAdditionalInfo,
        wholesalerProductRepository,
        wholesalerProductsGetterRepository
    )(wholesaler, updateCallback, endCallback),
    getAll: () => makeUseCase(
        getWholesalerProducts,
        wholesalerProductRepository
    )(),
    getAllByWholesalerId: ({ params }) => makeUseCase(
        getWholesalerProductsFromOneWholesaler,
        wholesalerProductRepository
    )(params.wholesalerId),
    getOne: ({ params }) => makeUseCase(
        getWholesalerProduct,
        wholesalerProductRepository
    )(params.id),
})