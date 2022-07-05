//Import general dependencies
import { emitter } from "../../shared/infrastructure/eventEmitter/index.js";

//Import use cases
import { makeCreateProduct } from "../application/CreateProduct.js";
import { makeGetProducts } from "../application/GetProducts.js";
import { makeGetProduct } from "../application/GetProduct.js";
import { makeDeleteProduct } from "../application/DeleteProduct.js";
import { makeUpdateProduct } from "../application/UpdateProduct.js";
import { makeSyncStockAndPrices } from "../application/SyncStockAndPrices.js"
import { makeUpdateWholesalerProducts } from "../../wholesalersProduct/application/UpdateWholesalerProducts.js";

//Import repositories factories
import { repositoryFactory } from "./repositories/factory.js";
import { sharedRepositoryFactory } from "../../shared/infrastructure/repositories/factory.js"
import { repositoryFactory as wpFactory } from "../../wholesalersProduct/infrastructure/repositories/factory.js";

//Create repositories with factories
const productRepository = repositoryFactory("productRepository");
const storageRepository = sharedRepositoryFactory("storageRepository");
const dollarRepository = sharedRepositoryFactory("dollarRepository");
const wholesalerProductRepository = wpFactory("wholesalerProductRepository");
const wholesalerProductsGetterRepository = wpFactory("wholesalerProductsGetterRepository");

//make use cases and inject dependencies
const updateWholesalerProducts = makeUpdateWholesalerProducts({ wholesalerProductRepository, wholesalerProductsGetterRepository, dollarRepository, emitter });
const createProduct = makeCreateProduct({ productRepository, storageRepository, dollarRepository, emitter });
const getProducts = makeGetProducts({ productRepository, dollarRepository });
const getProduct = makeGetProduct({ productRepository });
const deleteProduct = makeDeleteProduct({ productRepository, storageRepository });
const updateProduct = makeUpdateProduct({ productRepository, storageRepository, dollarRepository });
const syncStockAndPrices = makeSyncStockAndPrices({ productRepository, dollarRepository, updateWholesalerProducts, wholesalerProductRepository });

//Export controller
export const ProductController = Object.freeze({
    create: ({ body: { product }, files }) => createProduct(product, files),
    update: ({ params, body: { product }, files }) => updateProduct(params.id, product, files),
    getAll: getProducts,
    getOne: ({ params }) => getProduct(params.id),
    deleteOne: ({ params }) => deleteProduct(params.id),
    syncStockAndPrices: ({ body: { wholesaler } }) => syncStockAndPrices(wholesaler)
})
