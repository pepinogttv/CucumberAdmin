import { WholesalerProduct } from "../domain/WholesalerProductEntity.js"
let updating = false;
const updatingEventName = 'wholesalerProduct.update:updating';
const endEventName = 'wholesalerProduct.update:end';

export function makeUpdateWholesalerProducts({ wholesalerProductRepository, wholesalerProductsGetterRepository, dollarRepository, emitter }) {
    return async (wholesaler, wait) => {
        if (updating) return { updating: true }
        else updating = true;

        const dollar = await dollarRepository.getOfficialDollar();

        if (wait) {
            const products = await update({
                wholesaler,
                dollar,
                getProducts: wholesalerProductsGetterRepository.getAll,
                getOldProducts: () => wholesalerProductRepository.getAllMatchingWholesalerId(wholesaler._id),
                updateCallback: product => emitter.emit(updatingEventName, product)
            })
            await wholesalerProductRepository.deleteMany(wholesaler._id)
                .then(() => wholesalerProductRepository.insertMany(products))
                .then(() => emitter.emit(endEventName, products))
                .catch(error => emitter.emit(endEventName, { error }))
                .finally(() => (updating = false))
        } else {
            update({
                wholesaler,
                dollar,
                getProducts: wholesalerProductsGetterRepository.getAll,
                getOldProducts: () => wholesalerProductRepository.getAllMatchingWholesalerId(wholesaler._id),
                updateCallback: product => emitter.emit(updatingEventName, product)
            })
                .then(products => {
                    wholesalerProductRepository.deleteMany(wholesaler._id)
                        .then(() => wholesalerProductRepository.insertMany(products))
                        .then(() => emitter.emit(endEventName, products))
                        .catch(error => emitter.emit(endEventName, { error }))
                        .finally(() => (updating = false))
                })
        }

        return {
            message: `Actualizando productos de ${wholesaler.name}`,
            updatingEventName,
            endEventName
        }
    }
}

async function update({ wholesaler, dollar, getProducts, getOldProducts, updateCallback }) {
    return new Promise((resolve, reject) => {
        getProducts(wholesaler, wholesaler.categories, updateCallback)
            .then(products => products.map(product => WholesalerProduct({ ...product, wholesaler_id: wholesaler._id }, dollar)))
            .then(async products => {
                const oldProducts = await getOldProducts();
                if (oldProducts.length) {
                    const indexedOldProducts = indexProductsByProp(oldProducts, 'code');
                    const productsWithImages = rescueAdditionalInfo(products, indexedOldProducts);
                    return resolve(productsWithImages)
                }
                resolve(products);
            })
            .catch(reject);
    })
}

function rescueAdditionalInfo(products, indexedOldProducts) {
    return products.map(product => {
        const oldProduct = indexedOldProducts[product.code];
        const { images, mainImage, description } = oldProduct || {};
        if (images) product.images = images;
        if (mainImage) product.mainImage = mainImage;
        if (description) product.description = description;
        return product;
    })
}
function indexProductsByProp(products, prop) {
    return products.reduce((acc, product) => ({
        ...acc,
        [product[prop]]: product
    }), {});

}