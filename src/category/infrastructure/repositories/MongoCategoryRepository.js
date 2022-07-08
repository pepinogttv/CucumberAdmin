import mongoose from "mongoose"
import { CategoryModel } from "../category.momodel.js"
import { makeDefaultCrudMongoose } from "../../../shared/infrastructure/makeDefaultCrudMongoose.js"

export const mongoCategoryRepository = Object.freeze({
    ...makeDefaultCrudMongoose(CategoryModel),
    generateId: () => new mongoose.Types.ObjectId(),
    getChilds: (id) => CategoryModel.find({ idsTree: id }),
})