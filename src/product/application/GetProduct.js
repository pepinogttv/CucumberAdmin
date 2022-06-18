export function getProduct(productRepository) {
    return async function (id) {
        return productRepository.getOneById(id)
    }
}