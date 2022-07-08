export function makeGetCategory({ categoryRepository }) {
    return async function (id) {
        return categoryRepository.getOneById(id)
    }
}