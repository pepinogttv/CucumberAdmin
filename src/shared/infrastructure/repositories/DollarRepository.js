import logger from '../logger.js'
import axios from 'axios'
import { xml2js } from "xml-js"

const url = 'https://www.dolarsi.com/api/dolarSiInfo.xml';

export const dollarRepository = Object.freeze({
    getOfficialDollar: async () => {
        try {
            const response = await axios.get(url);
            const xml = response.data;
            const json = xml2js(xml, { compact: true });
            return Number(
                json.cotiza.Dolar.casa344.venta._text.replace(',', '.')
            )
        } catch (err) {
            logger.error('No se puedo obtener el dolar oficial')
            throw new Error('');
        }
    },
})