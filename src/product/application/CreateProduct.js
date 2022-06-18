
import { Product } from '../domain/ProductEntity.js';

export function createProduct(productRepository, storageRepository, dollarRepository, emitter) {
    return async function (productData, files) {
        const dollar = await dollarRepository.getOfficialDollar();
        const product = Product(productData, dollar);
        const productCreated = await productRepository.create(product);
        emitter.emit("product.created", productCreated);
        const imagesUrls = await storageRepository.uploadImages(files, `products/${productCreated._id}`);
        await productRepository.updateImages(productCreated._id, imagesUrls);
        if (imagesUrls) productCreated.images = imagesUrls;
        return productCreated;
    }
}