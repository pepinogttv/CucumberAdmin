
import { Wholesaler } from '../domain/WholesalerEntity.js';

export function createWholesaler({ wholesalerRepository, storageRepository }) {
    return async function (wholesalerData, file) {

        const wholesaler = Wholesaler(wholesalerData);
        const wholesalerCreated = await wholesalerRepository.create(wholesaler);

        const imageUrl = await storageRepository.uploadImage(file, `wholesalers/${wholesalerCreated._id}`);
        await wholesalerRepository.updateImage(wholesalerCreated._id, imageUrl);

        if (imageUrl) wholesalerCreated.image = imageUrl;
        return wholesalerCreated
    }
}