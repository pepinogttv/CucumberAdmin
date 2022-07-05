
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

export const playwrightWholesalerAuthStateRepository = Object.freeze({
    async getAuthState(wholesaler) {
        const authStatePath = getAuthStatePath(wholesaler)
        if (isExpired(authStatePath)) {
            await setAuthState(wholesaler, authStatePath)
        }
        const authState = getAuthStateFromPath(authStatePath)
        return {
            ...authState,
            getCookie: () => getCookieFromCookiesArray(authState.cookies)
        }
    },
})

function getCookieFromCookiesArray(cookies) {
    return cookies.map(({ name, value }) => `${name}=${value}`).join("; ").trim()
}
function getAuthStateFromPath(path) {
    return JSON.parse(fs.readFileSync(path))
}
function getAuthStatePath(wholesaler) {
    return path.join(process.cwd(), 'src', 'shared', 'infrastructure', 'playwright-auths-states', `${wholesaler.name}.json`)
}
async function setAuthState({ homePageUrl, user, password }, path) {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(homePageUrl);
    await page.fill("#username", user);
    await page.fill("#password", password);
    await page.click("text=Entrar");
    await page.goto("https://www.solutionbox.com.ar/buscar?categoria=T04");
    const stockBtn = await page.$('#chkSoloStock')
    if (!(await stockBtn.isChecked())) {
        await stockBtn.click()
        await page.reload();
    }
    await page.context().storageState({ path })
    setAuthStateExpirationDate(path);

    await browser.close();
}

function setAuthStateExpirationDate(path) {
    const authState = getAuthStateFromPath(path)
    const expirationDate = new Date()
    const hours = expirationDate.getHours()
    expirationDate.setHours(hours + 6)
    authState.expirationDate = expirationDate
    fs.writeFileSync(path, JSON.stringify(authState))
}

function isExpired(authStatePath) {
    if (!fs.existsSync(authStatePath)) return true
    const authState = getAuthStateFromPath(authStatePath)
    const expirationDate = authState.expirationDate
    const now = new Date()
    return now > expirationDate
}
