import { WholesalerModel } from "../wholesaler.momodel.js";
import { makeDefaultCrudMongoose } from "../../../shared/infrastructure/makeDefaultCrudMongoose.js";


export const mongoWholesalerRepository = Object.freeze({
    ...makeDefaultCrudMongoose(WholesalerModel),
    updateImage(id, image) {
        return WholesalerModel.updateOne({ _id: id }, { image }, { new: true }).exec()
    },
    updateCategories(id, categories) {
        return WholesalerModel.updateOne({ _id: id }, { categories }, { new: true }).exec()
    },
})