export function makeUpdateOneWholesalerProduct({ wholesalerProductRepository }) {
    return async function (code, data) {
        return wholesalerProductRepository.updateByCode(code, data);
    }
}