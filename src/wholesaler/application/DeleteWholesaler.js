export function deleteWholesaler(wholesalerRepository, storageRepository) {
    return async (id) => {
        const wholesaler = await wholesalerRepository.getOneById(id);
        await storageRepository.deleteImage(wholesaler.image);
        return wholesalerRepository.deleteOneById(id);
    }
}