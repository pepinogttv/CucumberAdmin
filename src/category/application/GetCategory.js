export function getCategory(categoryRepository) {
    return async function (id) {
        return categoryRepository.getOneById(id)
    }
}