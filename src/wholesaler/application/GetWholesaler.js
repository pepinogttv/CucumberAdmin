export function getWholesaler({ wholesalerRepository }) {
    return async function (id) {
        return wholesalerRepository.getOneById(id)
    }
}