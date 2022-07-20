export function makeGetWholesalerProducts({ wholesalerProductRepository, dollarRepository }) {
    return async () => {
        const products = await wholesalerProductRepository.getAll();
        const dollar = await dollarRepository.getOfficialDollar()

        for (const product of products) {
            product.taxs = convertTaxsToDollar(product.taxs, dollar)
            const taxs = product.taxs.reduce((acc, tax) => acc + tax.amount, 0)
            const total = product.price.amount + taxs;

            product.finalPrice = total * dollar;
            product.finalTaxs = taxs * dollar;
            product.dollarUsed = dollar;
        }

        return products
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