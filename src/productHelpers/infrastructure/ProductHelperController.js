import makeUseCase from '../../shared/application/MakeUseCase.js'
import { searchProduct } from '../application/SearchProduct.js';
import { getProductImages } from '../application/GetProductImages.js';

import { repositoryFactory } from "../infrastructure/repositories/factory.js"
const productHelperRepository = repositoryFactory("productHelperRepository");

export const ProductHelperController = Object.freeze({
    searchProduct: ({ params: { name }, body: { query } }) => makeUseCase(
        searchProduct,
        { productHelperRepository }
    )(name, query),
    getProductImages: ({ params: { name }, body: { productPageUrl } }) => makeUseCase(
        getProductImages,
        { productHelperRepository }
    )(name, productPageUrl),
})
