export function makeGetWholesalerProducts({ wholesalerProductRepository }) {
    return async () => wholesalerProductRepository.getAll();
}