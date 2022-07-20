
import { Wholesaler } from '../domain/WholesalerEntity.js';

export function makeUpdateWholesaler({ wholesalerRepository, storageRepository }) {
    return async function (id, wholesalerData, file) {

        let wholesaler = await wholesalerRepository.getOneById(id);
        if (!wholesaler) throw new Error('Wholesaler not found');

        if (file) {
            const { image: oldImageUrl } = wholesalerData;
            await storageRepository.deleteImage(oldImageUrl);
            const imageUrl = await storageRepository.uploadImage(file, `wholesalers/${id}`);
            wholesalerData.image = imageUrl;
        }

        wholesaler = Wholesaler(wholesalerData);
        const updated = await wholesalerRepository.update(id, wholesaler, { new: true });

        return updated

    }
}