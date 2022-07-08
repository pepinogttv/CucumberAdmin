import { makeSearchProduct } from '../application/SearchProduct.js';
import { makeGetProductImages } from '../application/GetProductImages.js';

import { repositoryFactory } from "../infrastructure/repositories/factory.js"
const productHelperRepository = repositoryFactory("productHelperRepository");

const searchProduct = makeSearchProduct({ productHelperRepository });
const getProductImages = makeGetProductImages({ productHelperRepository });


export const ProductHelperController = Object.freeze({
    searchProduct: ({ params: { name }, body: { query } }) => searchProduct(name, query),
    getProductImages: ({ params: { name }, body: { productPageUrl } }) => getProductImages(name, productPageUrl),
})
