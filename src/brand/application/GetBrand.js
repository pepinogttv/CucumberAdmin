export function makeGetBrand({ brandRepository }) {
    return async (id) => {
        return brandRepository.getOneById(id)
    }
}