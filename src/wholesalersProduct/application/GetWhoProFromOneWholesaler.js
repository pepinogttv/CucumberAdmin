export function getWholesalerProductsFromOneWholesaler(wholesalerProductRepository) {
    return async (wholesalerId) => {
        const products = await wholesalerProductRepository.getAllMatchingWholesalerId(wholesalerId);
        return products;
    }
}