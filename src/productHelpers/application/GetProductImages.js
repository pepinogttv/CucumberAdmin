export function makeGetProductImages({ productHelperRepository }) {
    return async function (name, productPageUrl) {
        console.log({ name, productPageUrl })
        const productHelper = productHelperRepository.get(name);
        if (!productHelper) throw new Error(`Product helper ${name} not found`);
        const images = await productHelper.getProductImages(productPageUrl);
        return images;
    }
}