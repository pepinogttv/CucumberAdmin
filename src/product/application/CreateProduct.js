
import { Product } from '../domain/ProductEntity.js';

export function makeCreateProduct({ productRepository, storageRepository, dollarRepository, emitter }) {
    return async function (productData, files, user) {

        //Cuando se crea el producto hay que descargar las imagenes de proveedor o del helper (SI ES QUE HAY));
        // const hasDownloadableImages = productData.images.find(image => !image.inlcudes('firebase'));


        if (!productData.wholesalerData?.dollarUsed) {
            productData.dollarUsed = await dollarRepository.getOfficialDollar();
        }

        const product = Product(productData);
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