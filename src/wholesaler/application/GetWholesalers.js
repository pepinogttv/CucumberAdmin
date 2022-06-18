export function getWholesalers(wholesalerRepository) {
    return async function () {
        return wholesalerRepository.getAll()
    }
}