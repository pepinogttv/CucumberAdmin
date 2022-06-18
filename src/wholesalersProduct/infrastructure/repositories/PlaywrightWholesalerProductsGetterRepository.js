
import { chromium } from 'playwright';
import { solutionBoxGetProducts } from '../../../shared/infrastructure/PlaywrightUtils.js'
import axios from "axios"
import path from 'path';
import fs from 'fs';
import jsdom from "jsdom"
const { JSDOM } = jsdom;

export const playwrightWholesalerProductsGetterRepository = Object.freeze({
    async getAll(wholesaler, categories, updateCallback) {
        const { homePageUrl, user, password, name } = wholesaler;
        const authStatePath = path.join(process.cwd(), 'shared', 'infrastructure', 'playwright-auths-states', `${name}.json`)
        const isAuthSaved = fs.existsSync(authStatePath);
        const browser = await chromium.launch({ headless: false });
        let page;

        if (isAuthSaved) {
            const context = await browser.newContext({ storageState: authStatePath });
            page = await context.newPage();
        } else {
            page = await browser.newPage();
            await page.goto(homePageUrl);
            await page.fill("#username", user);
            await page.fill("#password", password);
            await page.click("text=Entrar");
            await page.context().storageState({ path: authStatePath }).catch(err => console.log(err))
        }

        await page.goto("https://www.solutionbox.com.ar/buscar?categoria=T04");
        const stockBtn = await page.$('#chkSoloStock')
        if (!(await stockBtn.isChecked())) {
            await stockBtn.click()
            await page.reload();
        }

        const products = [];

        for (const [i, { url, name }] of Object.entries(categories)) {
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

    async getAdditionalInfo(wholesaler, products, updateCallback) {
        const { name: wholesalerName, homePageUrl } = wholesaler;
        const authStatePath = path.join(process.cwd(), 'shared', 'infrastructure', 'playwright-auths-states', `${wholesalerName}.json`)
        const isAuthSaved = fs.existsSync(authStatePath);

        if (isAuthSaved) {
            const { cookies } = JSON.parse(fs.readFileSync(authStatePath));
            const Cookie = getCookieFromCookiesArray(cookies);
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
        } else {
            throw new Error('Missing auth state of ' + wholesalerName)
        }
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