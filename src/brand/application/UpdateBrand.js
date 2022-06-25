export function updateBrand({ brandRepository, storageRepository }) {
    return async (id, newName, file) => {
        const brand = await brandRepository.getOneById(id);

        let newImageUrl;
        if (file) {
            await storageRepository.deleteImage(brand.image)
            newImageUrl = await storageRepository.ulpoadImage(file)
        }

        if (newName && newImageUrl) {
            return await brandRepository.update(id, {
                name: newName,
                image: newImageUrl
            })
        } else if (newName && !newImageUrl) {
            return await brandRepository.update(id, {
                name: newName,
            })
        } else if (!newName && newImageUrl) {
            return await brandRepository.update(id, {
                image: newImageUrl,
            })
        }

        throw new Error('Error al actualizar la marca.')
    }
}