import { WholesalerProduct } from "../domain/WholesalerProductEntity.js"
let updating = false;
const updatingEventName = 'wholesalerProduct.update:updating';
const endEventName = 'wholesalerProduct.update:end';

export function makeUpdateWholesalerProducts({ wholesalerProductRepository, wholesalerProductsGetterRepository, dollarRepository, emitter, wholesalerAuthStateRepository }) {
    return async (wholesaler, wait, categories) => {
        if (updating) return { updating: true }
        else updating = true;

        const dollar = await dollarRepository.getOfficialDollar();
        const authState = await wholesalerAuthStateRepository.get(wholesaler);
        console.log({ authState })

        if (wait) {
            const products = await update({
                wholesaler,
                dollar,
                getProducts: wholesalerProductsGetterRepository.getAll,
                getOldProducts: () => wholesalerProductRepository.getAllMatchingWholesalerId(wholesaler._id),
                updateCallback: product => emitter.emit(updatingEventName, product),
                categories,
                authState
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
                updateCallback: product => emitter.emit(updatingEventName, product),
                categories,
                authState
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

async function update({ wholesaler, dollar, getProducts, getOldProducts, updateCallback, categories, authState }) {
    return new Promise((resolve, reject) => {
        getProducts(wholesaler, categories, updateCallback, authState)
            .then(products => products.map(product => WholesalerProduct({ ...product, wholesaler_id: wholesaler._id }, dollar)))
            .then(async products => {
                const oldProducts = await getOldProducts();
                console.log({ oldProductsLenght: oldProducts.length })
                if (oldProducts.length) {
                    const indexedNewProducts = indexProductsByProp(products, 'code');
                    return resolve(rescueAdditionalInfo(products, oldProducts, indexedNewProducts))
                }
                resolve(products);
            })
            .catch(reject);
    })
}

function rescueAdditionalInfo(products, oldProducts, indexedNewProducts) {
    console.log({ products: products.length, oldProducts: oldProducts.length })
    oldProducts.forEach(oldProduct => {
        const newProduct = indexedNewProducts[oldProduct.code];
        if (newProduct) {
            const { images, mainImage, description, uploaded } = oldProduct || {};
            if (images) newProduct.images = images;
            if (mainImage) newProduct.mainImage = mainImage;
            if (description) newProduct.description = description;
            if (uploaded) newProduct.uploaded = uploaded;
        } else {
            oldProduct.stock = 0;
            products.push(oldProduct);
        }
    })
    console.log({ pushedProducts: products.length })
    return products;
}
function indexProductsByProp(products, prop) {
    return products.reduce((acc, product) => ({
        ...acc,
        [product[prop]]: product
    }), {});

}