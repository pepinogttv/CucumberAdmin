import axios from 'axios'
import { xml2js } from "xml-js"

const cachedDollar = {
    value: null,
    expiredAt: null
};

export const dollarRepository = Object.freeze({
    getOfficialDollar: async () => {
        if (cachedDollar.value && !isExpired(cachedDollar.expiredAt)) {
            return cachedDollar.value
        }
        try {
            const dollar = await getDollar();
            setCachedDollar(dollar)
            return dollar;
        } catch (err) {
            throw new Error('No se puedo obtener el dolar oficial');
        }
    },
})


function isExpired(expiredAt) {
    const expirationDate = new Date(expiredAt).getTime();
    const now = new Date()
    return now > expirationDate
}
function setCachedDollar(value) {
    cachedDollar.value = value;
    const expirationDate = new Date()
    const hours = expirationDate.getHours()
    expirationDate.setHours(hours + 6)
    cachedDollar.expiredAt = expirationDate
}
async function getDollar() {
    const url = 'https://www.dolarsi.com/api/dolarSiInfo.xml';
    const response = await axios.get(url);
    const xml = response.data;
    const json = xml2js(xml, { compact: true });
    return Number(
        json.cotiza.Dolar.casa344.venta._text.replace(',', '.')
    )
}