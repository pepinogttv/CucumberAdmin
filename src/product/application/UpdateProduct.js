
import { Product } from '../domain/ProductEntity.js';

export function makeUpdateProduct({ productRepository, storageRepository, dollarRepository }) {
    return async function (_id, productData, files) {

        const dollar = await dollarRepository.getOfficialDollar();
        const product = Product(productData, dollar);
        const productUpdated = await productRepository.update(_id, product);

        const { imagesURLsThatPersist } = productData;
        const imagesURLsToDelete = productUpdated.images.filter(image => !imagesURLsThatPersist.includes(image));

        await storageRepository.deleteImages(imagesURLsToDelete);

        const imagesURLs = await storageRepository.uploadImages(files, `products/${_id}`);
        await productRepository.updateImages(_id, [
            ...imagesURLsThatPersist,
            ...imagesURLs
        ]);

    }
}