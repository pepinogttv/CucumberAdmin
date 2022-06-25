export function deleteProduct({ productRepository, storageRepository }) {
    return async (id) => {
        const product = await productRepository.getOneById(id);
        await storageRepository.deleteImages(product.images);
        return productRepository.deleteOneById(id);
    }
}