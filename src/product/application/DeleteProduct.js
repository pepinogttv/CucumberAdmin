export function makeDeleteProduct({ productRepository, storageRepository }) {
    return async (id) => {
        const product = await productRepository.getOneById(id);
        await storageRepository.deleteImages(product.images);
        return productRepository.deleteOneById(id);
    }
}