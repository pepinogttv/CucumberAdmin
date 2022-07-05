export function searchProduct({ productHelperRepository }) {
    return async function (name, query) {
        console.log({ name, query });
        const productHelper = productHelperRepository.get(name);
        if (!productHelper) throw new Error(`Product helper ${name} not found`);
        const products = await productHelper.search(query);
        return products;
    }
}