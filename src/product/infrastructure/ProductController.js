import makeUseCase from "../../shared/application/makeUseCase.js";
import { emitter } from "../../shared/infrastructure/eventEmitter/index.js";


import { createProduct } from "../application/CreateProduct.js";
import { getProducts } from "../application/GetProducts.js";
import { getProduct } from "../application/GetProduct.js";
import { deleteProduct } from "../application/DeleteProduct.js";
import { updateProduct } from "../application/UpdateProduct.js";


import { repositoryFactory } from "./repositories/factory.js";
import { sharedRepositoryFactory } from "../../shared/infrastructure/repositories/factory.js"

const productRepository = repositoryFactory("productRepository");
const storageRepositroy = sharedRepositoryFactory("storageRepository");
const dollarRepository = sharedRepositoryFactory("dollarRepository");

export const ProductController = Object.freeze({
    create: ({ body: { product }, files }) => makeUseCase(
        createProduct,
        productRepository,
        storageRepositroy,
        dollarRepository,
        emitter
    )(product, files),
    update: ({ params, body: { product }, files }) => makeUseCase(
        updateProduct,
        productRepository,
        storageRepositroy,
        dollarRepository
    )(params.id, product, files),
    getAll: () => makeUseCase(
        getProducts,
        productRepository
    )(),
    getOne: ({ params }) => makeUseCase(
        getProduct,
        productRepository
    )(params.id),
    deleteOne: ({ params }) => makeUseCase(
        deleteProduct,
        productRepository,
        storageRepositroy
    )(params.id),

})