class SolutionBoxProduct {
    constructor(listItem, category, categoryUrl) {
        this.listItem = listItem;
        this.category = category;
        this.categoryUrl = categoryUrl;

        this.name = null;
        this.brand = null;
        this.stock = null;
        this.price = null;
        this.taxs = null;
        this.thumb = null;
        this.url = null;
        this.images = null;
        this.mainImage = null;
        this.code = null;
    }
    async setName() {
        this.name = await (await this.listItem.$("h6")).textContent();
    }
    async setBrand() {
        const brand = await (await this.listItem.$('[itemprop="brand"]')).textContent();
        this.brand = brand.trim();
    }
    async setStock() {
        let stock = await this.listItem.$(".li-stock");
        if (!stock) {
            this.stock = 0
            return
        };
        stock = (await stock.innerText()).split(": ")[1];
        this.stock = stock;
    }
    async setPrice() {
        const element = await this.listItem.$(".li-price");
        if (!element) return;
        let innerText = await element.innerText();
        if (!innerText) return;

        let price = innerText.split("\n")[0];
        if (!price || price === "Consulte el precio con el PM") return;
        if (price.includes("U$S")) {
            this.price = {
                currency: "USD",
                amount: Number(price.trim().split("S")[1])
            };
        } else {
            this.price = {
                currency: "ARS",
                amount: Number(price.trim().replace("$", ""))
            };
        }
    }
    async setTaxs() {
        const element = await this.listItem.$(".li-price");
        if (!element) return;
        let innerText = await element.innerText();
        if (!innerText) return;
        let tax = innerText.split("\n")[1];
        if (!tax) return;

        const currency = tax.includes("U$S") ? "USD" : "ARS";
        const amount = currency === "USD" ?
            Number(tax.trim().split(" ")[2]) :
            Number(tax.trim().split(" ")[2].replace(",", ""));

        this.taxs = [{
            name: "IVA",
            currency,
            amount
        }]
    }
    async setProductPageUrl() {
        const productPageUrl = await this.listItem.$eval("#ver-producto", (el) => el.href);
        this.url = productPageUrl;
    }
    async setThumb() {
        const thumb = await this.listItem.$eval('[itemprop="image"]', ({ src }) => {
            if (src.includes("imgdefault"))
                return "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png";
            return src;
        });
        this.thumb = thumb;
    }
    async setImagesAndDescription() {
        const { imagesURL, description } = await getDescriptionAndImages(this.productPageUrl);
        this.images = imagesURL;
        this.description = description;
    }
    async setMainImage() {
        this.mainImage = this.images[0];
    }
    async setAll() {
        return Promise.all([
            this.setName(),
            this.setBrand(),
            this.setStock(),
            this.setPrice(),
            this.setTaxs(),
            this.setProductPageUrl(),
            this.setThumb(),
            // this.setImagesAndDescription(),
            // this.setMainImage()
        ])
    }
    toJson() {
        return {
            name: this.name,
            brand: this.brand,
            stock: this.stock,
            price: this.price,
            taxs: this.taxs,
            thumb: this.thumb,
            url: this.url,
            images: this.images,
            mainImage: this.mainImage,
            description: this.description,
            category: this.category,
            categoryUrl: this.categoryUrl,
            code: this.url.split('=')[1]
        }
    }
}
async function solutionBoxCategoriesListToJson(liGroup) {
    let arr = [];
    for (let li of liGroup) {
        const ancor = await li.$(" > a");
        if (ancor) {
            const submenu = await li.$(" > ul");
            const { url, name } = await li.$eval(" > a", (el) => ({
                url: el.href,
                name: el.innerText
            }));
            if (submenu) {
                const subLiGroup = await submenu.$$(" > li");
                const childs = await solutionBoxCategoriesListToJson(subLiGroup);
                arr.push({
                    name,
                    url,
                    childs: childs
                });
            } else {
                arr.push({
                    url,
                    name
                });
            }
        }
    }
    return arr;
}

async function solutionBoxGetProducts({ page, categoryUrl, category, updateCallback, acc }) {
    console.log({ categoryUrl, category, updateCallback });
    const products = [];
    await page.goto(categoryUrl);

    const pagePaginationLIs = await page.$$("nav ul.pagination li");
    const totalPages = pagePaginationLIs.length ? pagePaginationLIs.length - 2 : 1;

    for (let pageNumber = 1; pageNumber < totalPages + 1; pageNumber++) {
        await page.goto(`${categoryUrl}&pag=${pageNumber}`);
        const productList = await page.$$("#grilla li.li-product");

        for (const product of productList) {
            const solutionBoxProduct = new SolutionBoxProduct(product, category, categoryUrl);
            await solutionBoxProduct.setAll();
            products.push(solutionBoxProduct.toJson());
            updateCallback([...acc, ...products]);
        }
    }
    return products;
}

export {
    solutionBoxCategoriesListToJson,
    solutionBoxGetProducts
}