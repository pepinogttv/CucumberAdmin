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
        return ProductModel.find({ "category._id": category_id }).exec()
    },
    getAllMatchingWholesalerId(wholesaler_id) {
        return ProductModel.find({ wholesaler_id }).exec()
    },
    async updateMany(products) {
        try {
            for (let product of products) {
                await ProductModel.findByIdAndUpdate(product._id, product).exec()
            }
        } catch (err) {
            throw new Error('[UpdateMany] Error al actualizar los products')
        }
        return products
    },
}