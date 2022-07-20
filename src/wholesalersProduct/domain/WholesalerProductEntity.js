export const WholesalerProduct = ({
    wholesaler_id,
    name,
    brand,
    category,
    stock,
    price,
    taxs,
    thumb,
    mainImage,
    images,
    url,
    code
}, dollar) => {
    for (const tax of taxs) {
        if (tax.currency === 'ARS') {
            tax.currency = 'USD';
            tax.amount = tax.amount / dollar;
        }
    }
    return ({
        wholesaler_id,
        name,
        brand,
        category,
        stock,
        price,
        taxs,
        thumb,
        mainImage,
        images,
        url,
        code,
    })
}