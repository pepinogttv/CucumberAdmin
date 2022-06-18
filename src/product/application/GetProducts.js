export function getProducts(dbRepository) {
    return async function () {
        return dbRepository.getAll()
    }
}