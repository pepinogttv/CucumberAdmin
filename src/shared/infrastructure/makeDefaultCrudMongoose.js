export const makeDefaultCrudMongoose = (momodel) => Object.freeze({
    getAll() {
        return momodel.find({}).lean().exec();
    },
    getOneById(id) {
        return momodel.findOne({ _id: id }).exec();
    },
    deleteOneById(id) {
        return momodel.deleteOne({ _id: id }).exec();
    },
    create(data) {
        return new Promise((resolve, reject) => {
            momodel.create(data, (err, documentCreated) => {
                if (err) return reject(err);
                resolve(documentCreated);
            })
        })
    },
    update(id, data) {
        return momodel.findByIdAndUpdate({ _id: id }, data, { new: false }).exec();
    }
}) 