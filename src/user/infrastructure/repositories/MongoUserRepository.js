import { BrandModel } from '../brand.momodel.js';
import { makeDefaultCrudMongoose } from "../../../shared/infrastructure/makeDefaultCrudMongoose.js"

export const mongoBrandRepository = Object.freeze({
    ...makeDefaultCrudMongoose(BrandModel),
    updateLogo(id, logo) {
        return BrandModel.updateOne({ _id: id }, { logo }, { new: true }).exec()
    }
})