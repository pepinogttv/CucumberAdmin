export function getWholesalerProducts({ wholesalerProductRepository }) {
    return async () => {

        return wholesalerProductRepository.getAll();

    }
}