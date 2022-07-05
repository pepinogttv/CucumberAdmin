export function makeGetProducts({ productRepository, dollarRepository }) {
    return async function () {
        const products = await productRepository.getAll();
        const dollar = await dollarRepository.getOfficialDollar();
        return products.map(product => {
            let sale;
            if (!product.price.percentOfProfit) {
                sale = Number((product.price.sale * dollar).toFixed(2));
            } else {
                const taxs = product.price.taxs.reduce((acc, curr) => acc + curr.amount, 0);
                const costWithTax = product.price.cost + taxs;
                sale = costWithTax * (1 + product.price.percentOfProfit)
                sale = Number((sale * dollar).toFixed(2))
            }
            return {
                ...product.toObject(),
                price: {
                    sale,
                }
            }
        })
    }
}