export function getWholesaler({ wholesalerRepository }) {
    return async function (id) {
        const wholesaler = await wholesalerRepository.getOneById(id)
        if (!wholesaler) throw new Error("Wholesaler not found")
        return wholesaler
    }
}