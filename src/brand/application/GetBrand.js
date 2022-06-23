export function getBrand(brandRepository) {
    return async (id) => {
        return brandRepository.getOneById(id)
    }
}