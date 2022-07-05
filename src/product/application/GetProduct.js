export function makeGetProduct({ productRepository }) {
    return async function (id) {
        return productRepository.getOneById(id)
    }
}