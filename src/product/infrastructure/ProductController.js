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
const storageRepository = sharedRepositoryFactory("storageRepository");
const dollarRepository = sharedRepositoryFactory("dollarRepository");

export const ProductController = Object.freeze({
    create: ({ body: { product }, files }) => makeUseCase(
        createProduct,
        { productRepository, storageRepository, dollarRepository, emitter }
    )(product, files),
    update: ({ params, body: { product }, files }) => makeUseCase(
        updateProduct,
        { productRepository, storageRepository, dollarRepository }
    )(params.id, product, files),
    getAll: () => makeUseCase(
        getProducts,
        { productRepository }
    )(),
    getOne: ({ params }) => makeUseCase(
        getProduct,
        { productRepository }
    )(params.id),
    deleteOne: ({ params }) => makeUseCase(
        deleteProduct,
        { productRepository, storageRepository }
    )(params.id),

})