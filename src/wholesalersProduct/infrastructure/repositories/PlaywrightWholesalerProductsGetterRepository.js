
import { chromium } from 'playwright';
import { solutionBoxGetProducts } from '../../../shared/infrastructure/PlaywrightUtils.js'
import axios from "axios"
import { JSDOM } from "jsdom"

export const playwrightWholesalerProductsGetterRepository = Object.freeze({
    async getAll(wholesaler, categories, updateCallback, authState) {
        // const { homePageUrl, user, password } = wholesaler;
        console.log(authState)
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext({ storageState: authState });
        const page = await context.newPage();

        await page.goto("https://www.solutionbox.com.ar/buscar?categoria=T04");
        const stockBtn = await page.$('#chkSoloStock')
        if (!(await stockBtn.isChecked())) {
            await stockBtn.click()
            await page.reload();
        }

        const products = [];

        for (const [i, { url, name }] of Object.entries(categories).slice(0, 1)) {
            const categoryProducts = await solutionBoxGetProducts({
                page,
                categoryUrl: url,
                category: name,
                updateCallback,
                acc: products,
            })
            products.push(...categoryProducts);
        }

        await page.close();
        await browser.close();
        return products;
    },

    async getAdditionalInfo(wholesaler, products, updateCallback, Cookie) {
        const { homePageUrl } = wholesaler;
        const axiosInstance = axios.create({ headers: { Cookie } })
        const additionalInfo = {};
        for (const product of products) {
            const { url } = product;
            const { data } = await axiosInstance.get(url);
            const dom = new JSDOM(data);
            const { document } = dom.window;
            const description = document.querySelector(".card-body").innerHTML;
            const imagesElements = document.getElementById("gallery").querySelectorAll("img");
            const images = await checkAndCorrectImages(imagesElements, axiosInstance, homePageUrl);
            additionalInfo[product.code] = { description, images, mainImage: images[0] };
            updateCallback(additionalInfo[product.code]);
        }
        return additionalInfo;

    }
})

async function checkAndCorrectImages(imagesElements, instance, homePageUrl) {

    let imagesUrls = []
    for (let { src } of imagesElements) {
        const isThumb = src.includes("thumb");
        if (src.startsWith('/')) src = src.replace('/', '')
        src = `${homePageUrl}${src}`
        src = isThumb ? src.replace("/thumbs/", "/").replace("_th", "") : src;
        imagesUrls.push(src);
    }

    const imagesPromises = imagesUrls.map(instance.get);

    const responses = await Promise.allSettled(imagesPromises);
    const allOk = responses.every(({ status }) => status === "fulfilled");
    if (!allOk) {
        imagesUrls = imagesUrls.map((url, i) => {
            const badUrl = responses[i].status === "rejected";
            if (badUrl) {
                const splited = url.split(".");
                const ext = splited[splited.length - 1];
                const lowercaseExt = ext.toLowerCase();
                const newExt = ext === lowercaseExt ? ext.toUpperCase() : lowercaseExt;
                return url.replace(ext, newExt);
            }
            return url;
        });
    }
    return [...new Set(imagesUrls)];
}

function getCookieFromCookiesArray(cookies) {
    return cookies.map(({ name, value }) => `${name}=${value}`).join("; ").trim()
}