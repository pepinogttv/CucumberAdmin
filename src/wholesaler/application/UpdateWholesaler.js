
import { Wholesaler } from '../domain/WholesalerEntity.js';

export function updateWholesaler({ wholesalerRepository, storageRepository }) {
    return async function (id, wholesalerData, file) {


        const wholesaler = Wholesaler(wholesalerData);
        let wholesalerUpdated = await wholesalerRepository.update(id, wholesaler);

        if (file) {
            await storageRepository.deleteImage(wholesaler.image);
            const imageUrl = await storageRepository.uploadImage(file);
            wholesalerUpdated = await wholesalerRepository.updateImage(id, imageUrl);
        }

        return wholesalerUpdated

    }
}