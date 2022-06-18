export function getCategories(categoryRepository) {
    return async function () {
        return categoryRepository.getAll()
    }
}