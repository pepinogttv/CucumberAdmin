const functionsToPreparePurchase = {
    'SolutionBox': async (products) => {
        const addToCart = async () => { }
        const processCart = async () => { }
        const getOrderCode = async () => { }
        for (const product of products) {
            await addToCart(product)
        }
        await processCart();
        return getOrderCode()
    }
}

export async function preparePurchaseFromWholesalers(order) {
    const wholesalerOrderCodes = {}
    const productsByWholesaler = order.products.reduce((acc, product) => {
        const { name: wholesalerName } = product.wholesalerData;
        acc[wholesalerName] = acc[wholesalerName] ? [...acc[wholesalerName], product] : [product];
        return acc;
    }, {})
    for (const wholesalerName in productsByWholesaler) {
        const preparePurchase = functionsToPreparePurchase[wholesalerName];
        const products = productsByWholesaler[wholesalerName];
        const orderCode = await preparePurchase(products);
        wholesalerOrderCodes[wholesalerName] = orderCode;
    }
    return wholesalerOrderCodes
}   