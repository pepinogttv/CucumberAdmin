export function updateWholesalerCategories(wholesalerRepositroy, wholesalerCategoriesGetterRepository) {
    return async (wholesaler, endCallback) => {
        const categories = await wholesalerCategoriesGetterRepository.getCategories(wholesaler);
        const res = wholesalerRepositroy.updateCategories(wholesaler._id, categories);
        endCallback(categories)
        return res;
    }
}