import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const AdminUserSchema = Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    role: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    productsUploaded: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    productsPendingPayment: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});
export const AdminUserModel = mongoose.model('AdminUser', AdminUserSchema);
