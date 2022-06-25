export function updateWholesalerCategories({ wholesalerRepository, wholesalerCategoriesGetterRepository }) {
    return async (wholesaler, endCallback) => {
        const categories = await wholesalerCategoriesGetterRepository.getCategories(wholesaler);
        const res = wholesalerRepository.updateCategories(wholesaler._id, categories);
        endCallback(categories)
        return res;
    }
}