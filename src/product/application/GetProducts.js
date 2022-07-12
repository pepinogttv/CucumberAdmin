export function makeGetProducts({ productRepository, dollarRepository }) {
    return async function () {
        const products = await productRepository.getAll();
        const dollar = await dollarRepository.getOfficialDollar();
        return products.map(product => {
            let sale;
            let profit;
            if (!product.price.percentOfProfit) {
                sale = Number((product.price.sale * dollar).toFixed(2));
                profit = sale;
            } else {
                const taxs = product.price.taxs.reduce((acc, curr) => acc + curr.amount, 0);
                const costWithTax = (product.price.cost + taxs) * dollar;
                sale = costWithTax * (1 + product.price.percentOfProfit)
                sale = Number(sale.toFixed(2))
                profit = Number((sale - costWithTax).toFixed(2))
            }
            return {
                ...product,
                profit,
                price: {
                    sale,
                    profit
                }
            }
        })
    }
}