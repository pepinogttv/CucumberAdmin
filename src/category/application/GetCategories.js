export function makeGetCategories({ categoryRepository }) {
    return async function () {
        return categoryRepository.getAll()
    }
}