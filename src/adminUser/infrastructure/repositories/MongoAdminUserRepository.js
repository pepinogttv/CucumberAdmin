import { AdminUserModel } from "../adminuser.momodel.js"

export const mongoAdminUserRepository = Object.freeze({
    getById: (_id) => AdminUserModel.findById(_id).exec(),
    getByUsername: (username) => AdminUserModel.findOne({ username }).exec(),
    getAll: () => AdminUserModel.find().exec(),
    create: (adminUser) => new Promise((resolve, reject) => {
        AdminUserModel.create(adminUser, (err, created) => {
            if (err) return reject(err);
            resolve(created);
        })
    }),
})


