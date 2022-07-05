function calculatePercentOfProfit({ cost, sale, taxs }) {
    if (!cost || !taxs) return 0
    const addedTaxes = taxs.reduce((acc, { amount }) => acc + amount, 0);
    const costWithTax = cost.amount + addedTaxes;
    return sale - costWithTax / costWithTax
}
export const Product = ({
    name,
    price,
    description,
    images,
    mainImage,
    brand,
    category,
    stock,
    wholesalerData,
    customFeatures,
    categoryFeatures,
    moreInfoUrl,
    ytVideos,
}, dollar) => {
    price.sale = price.sale / dollar;
    price.percentOfProfit = calculatePercentOfProfit(price)
    categoryFeatures = categoryFeatures.filter(({ value }) => !!value)

    return Object.freeze({
        name,
        price,
        description,
        images,
        mainImage,
        brand,
        category,
        stock,
        wholesalerData,
        customFeatures,
        categoryFeatures,
        moreInfoUrl,
        ytVideos,
    })
}
