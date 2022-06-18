export function deleteCategory(categoryRepository, productRepository) {
    return async (id) => {

        const products = await productRepository.getAllByCategoryId(id);
        const hasProducts = products && products.length > 0;
        if (hasProducts) {
            throw new Error('Cannot delete category with products');
        }

        const childs = await categoryRepository.getChildsById(id);
        const hasChilds = childs && childs.length > 0;
        if (hasChilds) {
            throw new Error('Cannot delete category with childs');
        }

        return categoryRepository.deleteOneById(id);
    }
}