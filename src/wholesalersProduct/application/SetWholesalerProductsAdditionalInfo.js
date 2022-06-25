export function setWholesalerProductsAdditionalInfo({ wholesalerProductRepository, wholesalerProductsGetterRepository }) {
    return async (wholesaler, updateCallback, endCallback) => {

        const products = await wholesalerProductRepository.getAllMatchingWholesalerId(wholesaler._id);
        const productsMissingAdditionalInfo = products.filter(product => !product.mainImage || !product.images || !product.images.length || !product.description);
        const productsFull = products.filter(product => product.mainImage && product.images && product.images.length && product.description);

        const additionalInfo = await wholesalerProductsGetterRepository.getAdditionalInfo(wholesaler, productsMissingAdditionalInfo, updateCallback);

        const completedMissingProducts = productsMissingAdditionalInfo.map(product => {
            product = product.toObject() || product.__doc || product;
            const additionalInfoForProduct = additionalInfo[product.code];
            return { ...product, ...additionalInfoForProduct };
        })

        const completedProducts = [...productsFull, ...completedMissingProducts];

        const res = await wholesalerProductRepository.updateMany(completedProducts);
        endCallback()
        return res;

    }
}