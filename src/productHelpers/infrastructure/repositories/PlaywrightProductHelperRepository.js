import { chromium } from "playwright"
export const playwrightProductHelperRepository = Object.freeze({
    get: (name) => {
        return helpres[name]
    },
})

const helpres = {
    mercadolibre: {
        search: async (productName) => {
            const browser = await chromium.launch();
            const page = await browser.newPage();
            await page.goto(`https://listado.mercadolibre.com.ar/${productName}`);

            const mlProducts = [];

            const products = await page.$$("li.ui-search-layout__item");

            await page.$eval(".ui-search", (container) => {
                const items = container.querySelectorAll("li.ui-search-layout__item");
                for (const item of items) {
                    window.scroll({
                        behavior: "smooth",
                        top: item.offsetTop,
                        left: 0
                    });
                }
            });

            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 800);
            });

            const productsPromises = products.map(async (product) => {
                const title = await (await product.$("h2.ui-search-item__title")).innerText();
                const price = await (await product.$(".price-tag-fraction")).innerText();
                const href = await product.$eval(".ui-search-link", (el) => el.href);
                let withoutInterest = await product.$(
                    ".ui-search-item__group__element.ui-search-installments.ui-search-color--LIGHT_GREEN"
                );
                if (withoutInterest) {
                    withoutInterest = await withoutInterest.innerText();
                }

                // await product.scrollIntoViewIfNeeded();
                let imgSrc = await product.$eval("img.ui-search-result-image__element", (img) => img.src);

                if (imgSrc.includes("W.webp")) {
                    imgSrc = imgSrc.replace("W.webp", "O.png");
                } else {
                    imgSrc = imgSrc.replace("V.webp", "O.png");
                }

                mlProducts.push({
                    title,
                    imgUrl: imgSrc,
                    price: Number(price.replace(".", "")),
                    href,
                    withoutInterest
                });
            });
            await Promise.all(productsPromises);
            await browser.close();
            return mlProducts;
        },
        getProductImages: async (productPageUrl) => {
            const browser = await chromium.launch();
            const page = await browser.newPage();
            await page.goto(productPageUrl);

            const imagesUrl = await page.$$eval(".ui-pdp-gallery__wrapper img", (images) => {
                const srcs = [];
                images.forEach((image) => {
                    if (image.src.includes("-R.webp")) return;
                    srcs.push(image.src);
                });
                return srcs;
            });

            await browser.close();
            return imagesUrl;
        }
    }
}