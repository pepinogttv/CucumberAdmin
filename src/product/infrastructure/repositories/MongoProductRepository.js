import { ProductModel } from "../product.momodel.js";
import { makeDefaultCrudMongoose } from "../../../shared/infrastructure/makeDefaultCrudMongoose.js";

export const mongoProductRepository = {
    ...makeDefaultCrudMongoose(ProductModel),
    updateImages(productId, imagesUrls) {
        const data = {
            images: imagesUrls,
            mainImage: imagesUrls[0]
        }
        return ProductModel.updateOne({ _id: productId }, data, { new: true }).exec()
    },
    getAllByCategoryId(category_id) {
        return ProductModel.find({ category_id }).exec()
    }
}