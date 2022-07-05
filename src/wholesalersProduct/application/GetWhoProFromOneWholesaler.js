export function makeGetWholesalerProductsFromOneWholesaler({ wholesalerProductRepository, dollarRepository }) {
    return async (wholesalerId) => {
        const dollar = await dollarRepository.getOfficialDollar()
        const products = await wholesalerProductRepository.getAllMatchingWholesalerId(wholesalerId);


        for (const product of products) {
            const taxs = product.taxs.reduce((acc, tax) => acc + tax.amount, 0)
            const total = product.price.amount + taxs;

            product.finalPrice = total * dollar;
            product.finalTaxs = taxs * dollar;
        }

        console.log(products[0])

        return products
    }
}