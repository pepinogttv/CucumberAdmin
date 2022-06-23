export function getBrands(brandRepository) {
    return async () => {
        return brandRepository.getAll()
    }
}