function calculatePercentOfProfit({ cost, sale, taxs = [] }) {
    if (!cost) return 0
    const addedTaxes = taxs.reduce((acc, { amount }) => acc + amount, 0);
    const costWithTax = cost + addedTaxes;
    return (sale - costWithTax) / costWithTax
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
    dollarUsed: dollar,
}) => {
    price.sale = Number(price.sale) / dollar;
    price.cost = Number(price.cost) / dollar;

    price.percentOfProfit = calculatePercentOfProfit(price)

    console.log({ price })

    categoryFeatures = categoryFeatures.filter(({ value }) => !!value)
    customFeatures = customFeatures.filter(({ value }) => !!value)

    return Object.freeze({
        name: name.trim(),
        price,
        description: description.trim(),
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
