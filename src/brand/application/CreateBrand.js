
// import { Product } from '../domain/ProductEntity.js';

export function createBrand({ brandRepository, storageRepository }) {
    return async function ({ name }, file) {
        const brandCreated = await brandRepository.create({ name });
        const imageUrl = await storageRepository.uploadImage(file, `brands/${brandCreated._id}`);
        await brandRepository.updateLogo(brandCreated._id, imageUrl);
        if (imageUrl) brandCreated.logo = imageUrl;
        return brandCreated
    }
}