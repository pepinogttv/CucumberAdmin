export function makeGetWholesalerProduct({ wholesalerProductRepository, dollarRepository }) {
    return async (id) => {
        const dollar = await dollarRepository.getOfficialDollar()
        const product = (await wholesalerProductRepository.getOneById(id)).toObject()

        product.taxs = convertTaxsToDollar(product.taxs, dollar)
        const taxs = product.taxs.reduce((acc, tax) => acc + tax.amount, 0)
        const total = product.price.amount + taxs;
        product.finalPrice = total * dollar;
        product.finalTaxs = taxs * dollar;

        return product;
    }
}
function convertTaxsToDollar(taxs, dollar) {
    return taxs.map(({ amount, currency, name }) => {
        if (currency === 'ARS') {
            return {
                amount: Number(amount) / dollar,
                currency: 'USD',
                name
            }
        }
        return { amount, currency, name }
    })
}