import makeUseCase from "../../shared/application/makeUseCase.js";

import { createWholesaler } from "../application/CreateWholesaler.js"
import { updateWholesaler } from "../application/UpdateWholesaler.js";
import { getWholesalers } from "../application/GetWholesalers.js"
import { deleteWholesaler } from "../application/DeleteWholesaler.js"
import { getWholesaler } from "../application/GetWholesaler.js"
import { updateWholesalerCategories } from "../application/UpdateWholesalerCategories.js"

import { sharedRepositoryFactory } from "../../shared/infrastructure/repositories/factory.js";
import { repositoryFactory } from "./repositories/factory.js";

const storageRepository = sharedRepositoryFactory("storageRepository");
const wholesalerRepository = repositoryFactory("wholesalerRepository");
const wholesalerCategoriesGetterRepository = repositoryFactory("wholesalerCategoriesGetterRepository");

export const WholesalerController = Object.freeze({
    create: ({ body: { wholesaler }, file }) => makeUseCase(
        createWholesaler,
        wholesalerRepository,
        storageRepository
    )(wholesaler, file),
    update: ({ params, body: { wholesaler }, file }) => makeUseCase(
        updateWholesaler,
        wholesalerRepository,
        storageRepository
    )(params.id, wholesaler, file),
    getAll: () => makeUseCase(
        getWholesalers,
        wholesalerRepository
    )(),
    getOne: ({ params }) => makeUseCase(
        getWholesaler,
        wholesalerRepository,
    )(params.id),
    deleteOne: ({ params }) => makeUseCase(
        deleteWholesaler,
        wholesalerRepository,
        storageRepository
    )(params.id),
    updateWholesalerCategories: ({ wholesaler, endCallback }) => makeUseCase(
        updateWholesalerCategories,
        wholesalerRepository,
        wholesalerCategoriesGetterRepository,
    )(wholesaler, endCallback)
})