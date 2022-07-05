

export function makeSyncStockAndPrices({ productRepository, dollarRepository, updateWholesalerProducts, wholesalerProductRepository }) {
    return async function (wholesaler) {
        await updateWholesalerProducts(wholesaler, true);
        const wholesalerProducts = await wholesalerProductRepository.getAllMatchingWholesalerId(wholesaler._id);
        const products = await productRepository.getAllMatchingWholesalerId(wholesaler._id);

        const indexedWholesalerProducts = wholesalerProducts.reduce((acc, wholesalerProduct) => {
            acc[wholesalerProduct.code] = wholesalerProduct;
            return acc;
        }, {})

        for (const product of products) {
            const wholesalerProduct = indexedWholesalerProducts[product.code];
            product.stock = wholesalerProduct ? wholesalerProduct.stock : 0;
            if (wholesalerProduct) {
                const { amount, currency } = wholesalerProduct.price.cost;
                if (currency === 'ARS') {
                    const dollar = await dollarRepository.getOfficialDollar();
                    product.price.cost = amount / dollar;
                } else {
                    product.price.cost = amount;
                }
            }
        }

        return await productRepository.updateMany(products);

    }
}