export function deleteBrand({ brandRepository, storageRepository }) {
    return async (id) => {
        const brand = await brandRepository.getOneById(id);
        await storageRepository.deleteImage(brand.logo)
        return await brandRepository.deleteOneById(id)
    }
}