export function makeGetBrands({ brandRepository }) {
    return async () => {
        return brandRepository.getAll()
    }
}