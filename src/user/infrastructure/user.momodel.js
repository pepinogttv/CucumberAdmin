import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UserSchema = Schema({
    provider_id: { type: String, required: true },
    email: { type: String, required: true },
    shipping_info: {
        direction: String
    },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
});
export const UserModel = mongoose.model('User', UserSchema);
