
import { Product } from '../domain/ProductEntity.js';

export function makeCreateProduct({ productRepository, storageRepository, dollarRepository, emitter }) {
    return async function (productData, files, user) {

        const dollar = await dollarRepository.getOfficialDollar();
        const product = Product(productData, dollar);
        const productCreated = await productRepository.create(product);

        emitter.emit("product.created", {
            product: productCreated,
            user
        });

        const imagesUrls = await storageRepository.uploadImages(files, `products/${productCreated._id}`);
        await productRepository.updateImages(productCreated._id, imagesUrls);
        if (imagesUrls) productCreated.images = imagesUrls;
        return productCreated;
    }
}