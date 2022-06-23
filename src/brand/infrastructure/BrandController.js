import makeUseCase from "../../shared/application/makeUseCase.js";


import { createBrand } from "../application/CreateBrand.js"
import { updateBrand } from "../application/UpdateBrand.js"
import { deleteBrand } from "../application/DeleteBrand.js"
import { getBrand } from "../application/GetBrand.js"
import { getBrands } from "../application/GetBrands.js"

import { repositoryFactory } from "./repositories/factory.js"
import { sharedRepositoryFactory } from "../../shared/infrastructure/repositories/factory.js"

const brandRepository = repositoryFactory('brandRepository')
const storageRepositroy = sharedRepositoryFactory("storageRepository");

export const BrandController = Object.freeze({
    create: ({ body, file }) => makeUseCase(
        createBrand,
        brandRepository,
        storageRepositroy
    )(body, file),
    update: ({ body, file }) => makeUseCase(
        updateBrand,
        brandRepository,
        storageRepositroy
    )(body, file),
    getAll: () => makeUseCase(
        getBrands,
        brandRepository
    )(),
    getOne: ({ params }) => makeUseCase(
        getBrand,
        brandRepository
    )(params.id),
    deleteOne: ({ params }) => makeUseCase(
        deleteBrand,
        brandRepository
    )(params.id),
})