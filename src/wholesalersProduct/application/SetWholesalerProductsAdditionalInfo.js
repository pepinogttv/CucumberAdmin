let seting = false;
const updatingEventName = 'wholesalerProduct.setAdditionalInfo:updating';
const endEventName = 'wholesalerProduct.setAdditionalInfo:end';

export function makeSetWholesalerProductsAdditionalInfo({ wholesalerProductRepository, wholesalerProductsGetterRepository, wholesalerAuthStateRepository, emitter }) {
    return async (wholesaler) => {
        if (seting) return 'Banca loco, se esta actualizando.'
        seting = true;

        const authState = await wholesalerAuthStateRepository.getAuthState(wholesaler);
        const Cookie = authState.getCookie();

        const products = await wholesalerProductRepository.getAllMatchingWholesalerId(wholesaler._id);
        if (!products.length) return 'No hay productos para actualizar.'

        const productsMissingAdditionalInfo = products.filter(missingAdditionaInfo);
        const productsFull = products.filter(noMissingAdditionalInfo);

        set({
            wholesaler,
            productsMissingAdditionalInfo,
            productsFull,
            updateCallback: product => emitter.emit(updatingEventName, product),
            getAdditionalInfo: wholesalerProductsGetterRepository.getAdditionalInfo,
            Cookie
        })
            .then(readyProducts => {
                wholesalerProductRepository.updateMany(readyProducts)
                    .then(() => emitter.emit(endEventName, readyProducts))
                    .catch(error => emitter.emit(endEventName, { error }))
                    .finally(() => (seting = false))
            })

        return {
            message: 'Se esta actualizando la informacion adicional de los productos.',
            updatingEventName,
            endEventName
        }
    }
}

async function set({ wholesaler, productsMissingAdditionalInfo, productsFull, updateCallback, getAdditionalInfo, Cookie }) {
    return new Promise(async (resolve, reject) => {
        try {
            const additionalInfo = await getAdditionalInfo(wholesaler, productsMissingAdditionalInfo, updateCallback, Cookie);
            const completedMissingProducts = productsMissingAdditionalInfo.map(product => {
                const additionalInfoForProduct = additionalInfo[product.code];
                return { ...product, ...additionalInfoForProduct };
            })
            const completedProducts = [...productsFull, ...completedMissingProducts];
            resolve(completedProducts);
        } catch (error) {
            reject(error);
        }
    })

}

function missingAdditionaInfo(product) {
    return !product.mainImage || !product.images || !product.images.length || !product.description
}

function noMissingAdditionalInfo(product) {
    return product.mainImage && product.images && product.images.length && product.description
}