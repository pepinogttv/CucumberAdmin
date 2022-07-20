import { Product } from "../domain/ProductEntity.js";

export function makeCreateProduct({
  productRepository,
  storageRepository,
  imageDownloader,
  dollarRepository,
  emitter,
}) {
  return async function x(productData, files, user) {
    files = files.map(({ buffer }) => buffer);

    // Cuando se crea el producto hay que descargar las imagenes de proveedor o del helper (SI ES QUE HAY));
    const hasDownloadableImages = productData.images.find(
      (image) => !String(image).includes("firebase")
    );
    if (hasDownloadableImages) {
      const images = await imageDownloader.downloadBuffersFromUrls(
        productData.images
      );
      productData.images = images;
    }

    if (!productData.wholesalerData?.dollarUsed) {
      productData.dollarUsed = await dollarRepository.getOfficialDollar();
    }

    try {
      const id = await productRepository.generateId();
      productData.images = await storageRepository.uploadImages(
        [...files, ...productData.images],
        `products/${id}`
      );
      productData.id = id;
      const product = Product(productData);
      const productCreated = await productRepository.create(product);

      emitter.emit("product.created", {
        product: productCreated,
        user,
      });
      return productCreated;
    } catch (err) {
      if (err.code === 11000) throw new Error("El producto ya existe");
      else throw new Error(err);
    }
  };
}
