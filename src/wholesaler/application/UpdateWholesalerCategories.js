export function updateWholesalerCategories({ wholesalerRepository, wholesalerCategoriesGetterRepository }) {
    return async (wholesaler) => {
        const categories = await wholesalerCategoriesGetterRepository.getCategories(wholesaler);
        const res = wholesalerRepository.updateCategories(wholesaler._id, categories);
        return res;
    }
}