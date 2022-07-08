import { WholesalerProductModel } from '../wholesalerProduct.momodel.js';

export const mongoWholesalerProductRepository = Object.freeze({
    getAll() {
        return WholesalerProductModel.find({}).exec()
    },
    getOneById(id) {
        return WholesalerProductModel.findById(id).exec()
    },
    getAllMatchingWholesalerId(id) {
        return WholesalerProductModel.find({ wholesaler_id: id }).lean().exec()
    },
    async updateMany(products) {
        try {
            for (let product of products) {
                await WholesalerProductModel.findOneAndUpdate({ code: product.code }, product).exec()
            }
        } catch (err) {
            throw new Error('[UpdateMany] Error al actualizar los wholesalerProducts')
        }
        return products
    },
    insertMany(products) {
        return new Promise((resolve, reject) => {
            WholesalerProductModel.insertMany(products, (err, docs) => {
                if (err) return reject(err);
                resolve(docs);
            })
        })
    },
    deleteMany(id) {
        return WholesalerProductModel.deleteMany({ wholesalerId: id }).exec()
    },
})