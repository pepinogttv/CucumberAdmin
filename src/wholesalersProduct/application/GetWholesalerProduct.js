export function getWholesalerProduct(wholesalerProductRepository) {
    return async (id) => {
        const products = await wholesalerProductRepository.getOneById(id)
        return products;
    }
}