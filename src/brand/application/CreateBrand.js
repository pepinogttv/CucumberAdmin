
// import { Product } from '../domain/ProductEntity.js';

export function createBrand(brandRepository, storageRepository) {
    return async function (brandData, file) {
        const brandCreated = await brandRepository.create(brandData);
        const imageUrl = await storageRepository.uploadImage(file, `brands/${brandCreated._id}`);
        await brandRepository.updateImage(wholesalerCreated._id, imageUrl);
        if (imageUrl) brandCreated.image = imageUrl;
        return brandCreated
    }
}