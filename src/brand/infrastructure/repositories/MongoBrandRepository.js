import { BrandModel } from '../brand.momodel.js';
import { makeDefaultCrudMongoose } from "../../../shared/infrastructure/makeDefaultCrudMongoose.js"

export const mongoBrandRepository = Object.freeze({
    ...makeDefaultCrudMongoose(BrandModel),
    updateImage(id, image) {
        return Wholesaler.updateOne({ _id: id }, { image }, { new: true }).exec()
    }
})