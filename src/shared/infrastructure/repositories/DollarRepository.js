import logger from '../logger.js'
import axios from 'axios'
import { xml2js } from "xml-js"

const url = 'https://www.dolarsi.com/api/dolarSiInfo.xml';
let cachedDollar = null

export const dollarRepository = Object.freeze({
    getOfficialDollar: async () => {
        console.log(cachedDollar)
        if (cachedDollar) return cachedDollar;
        try {
            const response = await axios.get(url);
            const xml = response.data;
            const json = xml2js(xml, { compact: true });
            const dollar = Number(
                json.cotiza.Dolar.casa344.venta._text.replace(',', '.')
            )
            cachedDollar = dollar;
            return dollar;
        } catch (err) {
            logger.error('No se puedo obtener el dolar oficial')
            throw new Error('');
        }
    },
})