import { WholesalerProduct } from "../domain/WholesalerProductEntity.js"
export function updateWholesalerProducts(wholesalerProductRepository, wholesalerProductsGetterRepository, dollarRepository) {
    return async (wholesaler, updateCallback, endCallback) => {
        const { categories } = wholesaler;
        const dollar = await dollarRepository.getOfficialDollar();

        const gettedProducts = await wholesalerProductsGetterRepository.getAll(wholesaler, categories, updateCallback)

        const products = gettedProducts.map(product => WholesalerProduct({ ...product, wholesaler_id: wholesaler._id }, dollar));
        const oldProducts = wholesalerProductRepository.getAllMatchingWholesalerId(wholesaler._id);

        if (oldProducts.length) {
            const indexedOldProducts = indexProductsById(oldProducts);
            const productsWithImages = rescueAdditionalInfo(products, indexedOldProducts);

            await wholesalerProductRepository.deleteMany(wholesaler._id);
            const res = await wholesalerProductRepository.insertMany(productsWithImages);

            endCallback(products)
            return res;
        }


        const res = await wholesalerProductRepository.insertMany(products);
        endCallback(products)
        return res;
    }
}

function rescueAdditionalInfo(products, indexedOldProducts) {
    return products.map(product => {
        const oldProduct = indexedOldProducts[product.id];
        const { images, mainImage, description } = oldProduct || {};
        if (images) product.images = images;
        if (mainImage) product.mainImage = mainImage;
        if (description) product.description = description;
        return product;
    })
}
function indexProductsById(products) {
    return products.reduce((acc, product) => ({
        ...acc,
        [product.id]: product
    }), {});
}