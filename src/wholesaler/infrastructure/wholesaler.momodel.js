import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const WholesalerSchema = Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    password: { type: String, required: true },
    homePageUrl: { type: String, required: true },
    productsPageUrl: { type: String, required: true },
    categories: Object,
    products: Array,
    image: String,
});
export const WholesalerModel = mongoose.model('Wholesaler', WholesalerSchema);