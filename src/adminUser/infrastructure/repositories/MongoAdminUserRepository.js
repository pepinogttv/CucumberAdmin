import { AdminUserModel } from "../adminuser.momodel.js"

export const mongoAdminUserRepository = Object.freeze({
    getOneById: (_id) => AdminUserModel.findById(_id).exec(),
    getByUsername: (username) => AdminUserModel.findOne({ username }).exec(),
    getAll: () => AdminUserModel.find().exec(),
    create: (adminUser) => new Promise((resolve, reject) => {
        AdminUserModel.create(adminUser, (err, created) => {
            if (err) return reject(err);
            resolve(created);
        })
    }),
    addProductUploaded: (adminUser, product) => {
        return AdminUserModel.updateOne({ _id: adminUser._id },
            { $push: { productsUploaded: product._id, productsPendingPayment: product._id } }
        ).exec()
    }
})


