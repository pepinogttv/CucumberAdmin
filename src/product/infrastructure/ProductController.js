// Import general dependencies
import { emitter } from "../../shared/infrastructure/eventEmitter/index.js";
import { imageDownloader } from "../../shared/infrastructure/ImageDownloader.js"

// Import use cases
import { makeCreateProduct } from "../application/CreateProduct.js";
import { makeGetProducts } from "../application/GetProducts.js";
import { makeGetProduct } from "../application/GetProduct.js";
import { makeDeleteProduct } from "../application/DeleteProduct.js";
import { makeUpdateProduct } from "../application/UpdateProduct.js";
import { makeSyncStockAndPrices } from "../application/SyncStockAndPrices.js"
import { makeUpdateWholesalerProducts } from "../../wholesalersProduct/application/UpdateWholesalerProducts.js";

// Import repositories factories
import { repositoryFactory } from "./repositories/factory.js";
import { sharedRepositoryFactory } from "../../shared/infrastructure/repositories/factory.js"
import { repositoryFactory as wpFactory } from "../../wholesalersProduct/infrastructure/repositories/factory.js";

// Create repositories with factories
const productRepository = repositoryFactory("productRepository");
const storageRepository = sharedRepositoryFactory("storageRepository");
const dollarRepository = sharedRepositoryFactory("dollarRepository");
const wholesalerProductRepository = wpFactory("wholesalerProductRepository");
const wholesalerProductsGetterRepository = wpFactory("wholesalerProductsGetterRepository");

// make use cases and inject dependencies
const updateWholesalerProducts = makeUpdateWholesalerProducts({ wholesalerProductRepository, wholesalerProductsGetterRepository, dollarRepository, emitter });
const createProduct = makeCreateProduct({ productRepository, storageRepository, dollarRepository, emitter, imageDownloader });
const getProducts = makeGetProducts({ productRepository, dollarRepository });
const getProduct = makeGetProduct({ productRepository });
const deleteProduct = makeDeleteProduct({ productRepository, storageRepository });
const updateProduct = makeUpdateProduct({ productRepository, storageRepository, dollarRepository });
const syncStockAndPrices = makeSyncStockAndPrices({ productRepository, dollarRepository, updateWholesalerProducts, wholesalerProductRepository });

// Export controller
export const ProductController = Object.freeze({
    create: ({ body: { product }, files, user }) => {
        if (!files.length && !product.images.length) return Promise.reject(new Error("Los archivos son requeridos"));
        if (!product.price?.sale) return Promise.reject(new Error("El precio de venta es requerido"));
        if (!product.name) return Promise.reject(new Error("El nombre es requerido"));
        if (!product.brand?._id) return Promise.reject(new Error("La marca es requerida"));
        if (!product.category?._id) return Promise.reject(new Error("La categoria es requerida"));
        if (!product.stock) return Promise.reject(new Error("El stock es requerido"));
        if (product.price.sale < product.price.cost) return Promise.reject(new Error("El precio de venta no puede ser menor al precio de costo"));
        return createProduct(product, files, user)
    },
    update: ({ params, body: { product }, files }) => updateProduct(params.id, product, files),
    getAll: getProducts,
    getOne: ({ params }) => getProduct(params.id),
    deleteOne: ({ params }) => deleteProduct(params.id),
    syncStockAndPrices: ({ body: { wholesaler } }) => syncStockAndPrices(wholesaler)
})
