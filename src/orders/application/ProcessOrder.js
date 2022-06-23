export function PorcessOrder(orderRepository, preparePurchaseFromWholesalers) {
    return async (id) => {
        const order = orderRepository.getOneById(id);
        const { status } = order;
        if (status !== 'paid') throw new Error('No se puede procesar una orden que no esta pagada.')

        const wholesalersOrderCodes = await preparePurchaseFromWholesalers(order);
        order.products = order.products.map(product => {
            const { name: wholesalerName } = product.wholesalerData
            product.wholesalerOrderCode = wholesalersOrderCodes[wholesalerName]
            return product;
        })
        order.status = 'pending-payment-to-wholesaler'

        return order;
    }
}