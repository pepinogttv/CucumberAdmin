export function makeGetWholesalers({ wholesalerRepository }) {
    return async function () {
        return wholesalerRepository.getAll()
    }
}