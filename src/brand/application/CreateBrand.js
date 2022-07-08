
// import { Product } from '../domain/ProductEntity.js';

export function createBrand({ brandRepository, storageRepository }) {
    return async function ({ name }, file) {

        if (!name || !file) throw new Error("Complete all fields");

        name = name.trim().toLowerCase();

        const brandCreated = await brandRepository.create({ name });
        const imageUrl = await storageRepository.uploadImage(file, `brands`, name);
        await brandRepository.updateLogo(brandCreated._id, imageUrl);
        if (imageUrl) brandCreated.logo = imageUrl;
        return brandCreated
    }
}