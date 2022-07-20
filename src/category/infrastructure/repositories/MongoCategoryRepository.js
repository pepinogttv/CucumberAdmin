import { CategoryModel } from "../category.momodel.js";
import { makeDefaultCrudMongoose } from "../../../shared/infrastructure/makeDefaultCrudMongoose.js";

export const mongoCategoryRepository = Object.freeze({
  ...makeDefaultCrudMongoose(CategoryModel),
  getChilds: (id) => CategoryModel.find({ idsTree: id }),
});
