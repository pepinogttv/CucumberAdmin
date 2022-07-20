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
    id,
}) => {
    price.sale = Number(price.sale) / dollar;
    price.cost = Number(price.cost) / dollar;
    price.percentOfProfit = calculatePercentOfProfit(price.sale, price.cost)

    categoryFeatures = categoryFeatures.filter(({ value }) => !!value)
    customFeatures = customFeatures.filter(({ value }) => !!value)

    return Object.freeze({
        _id: id,
        name: name.trim(),
        price,
        description: description.trim(),
        images,
        mainImage: images[0],
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

function calculatePercentOfProfit(sale, cost) {
    if (!cost) return 0
    return (sale - cost) / cost
}
