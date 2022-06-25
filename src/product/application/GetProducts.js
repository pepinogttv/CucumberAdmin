export function getProducts({ productRepository }) {
    return async function () {
        return productRepository.getAll()
    }
}