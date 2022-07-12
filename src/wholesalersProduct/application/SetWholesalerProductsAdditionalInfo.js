
let seting = false;
const updatingEventName = 'wholesalerProduct.setAdditionalInfo:updating';
const endEventName = 'wholesalerProduct.setAdditionalInfo:end';

export function makeSetWholesalerProductsAdditionalInfo({ wholesalerProductRepository, wholesalerProductsGetterRepository, wholesalerAuthStateRepository, emitter }) {
    return async (wholesaler, categories = [], forceReplace) => {
        if (seting) return 'Banca loco, se esta actualizando.'
        seting = true;

        const authState = await wholesalerAuthStateRepository.get(wholesaler);
        const cookie = authState.getCookie();

        let products = await wholesalerProductRepository.getAllMatchingWholesalerId(wholesaler._id);

        if (categories.length) {
            categories = categories.map(({ name }) => name);
            products = products.filter(product => categories.includes(product.category));
        }

        if (!products.length) return { message: 'No hay productos para actualizar' };

        const productsToUpdate = forceReplace ? products : products.filter(missingAdditionaInfo);
        console.log({ productsToUpdate: productsToUpdate.length });

        wholesalerProductsGetterRepository.getAdditionalInfo({
            wholesaler,
            products: productsToUpdate,
            cookie,
            updateCallback: async (additionalInfo, product) => {
                const { _id, name } = product;
                console.log({ additionalInfo })
                const productUpdated = await wholesalerProductRepository.update(_id, additionalInfo)
                console.log(productUpdated)
                emitter.emit(updatingEventName, { _id });
            }
        })
            .then((additionalInfo) => {
                console.log('THEN')
                emitter.emit(endEventName, { message: `Se actualizaron ${additionalInfo.length} productos` });
            })
            .catch(error => {
                emitter.emit(endEventName, { error: { description: error.message } });
            })
            .finally(() => {
                console.log('FINALLY')
                seting = false;
            })

        return {
            message: 'Se esta actualizando la informacion adicional de los productos.',
            updatingEventName,
            endEventName
        }
    }
}

function missingAdditionaInfo(product) {
    return !product.mainImage || !product.images || !product.images.length || !product.description
}
// function noMissingAdditionalInfo(product) {
//     return product.mainImage && product.images && product.images.length && product.description
// }