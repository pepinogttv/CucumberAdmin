import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const WholesalerProductSchema = Schema({
    wholesaler_id: { type: Schema.Types.ObjectId, ref: 'Wholesaler' },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    price: {
        currency: { type: String, required: true },
        amount: { type: Number, required: true },
    },
    taxs: [{
        name: { type: String, required: true },
        currency: { type: String, required: true },
        amount: { type: Number, required: true },
    }],
    thumb: { type: String, required: true },
    code: { type: String, required: true },
    url: { type: String, required: true },
    mainImage: String,
    images: Array,

});
export const WholesalerProductModel = mongoose.model('WholesalerProduct', WholesalerProductSchema);