import { chromium } from 'playwright';
import { solutionBoxCategoriesListToJson } from '../../../shared/infrastructure/PlaywrightUtils.js';

export const playwrightWholesalerCategoriesGetterRepository = Object.freeze({
    async getCategories(wholesaler) {
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(wholesaler.homePageUrl);
        const list = await page.$$(".dropdown-menu.dropright > li");
        const categories = await solutionBoxCategoriesListToJson(list);
        await browser.close();
        return categories;
    },
})