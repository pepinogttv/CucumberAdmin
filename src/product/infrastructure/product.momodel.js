import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ProductSchema = Schema({
    // _id: { type: mongoose.Types.ObjectId, required: false },
    name: { type: String, required: false },
    brand_id: { type: Schema.Types.ObjectId, ref: 'Brand' },
    category_id: { type: mongoose.Types.ObjectId, ref: 'Category' },
    images: { type: Array, required: false },
    mainImage: { type: String, required: false },
    stock: { type: Number, required: false },
    description: { type: String, required: false },
    price: { type: Object, required: false },
    wholesalerData: { type: Object, default: { name: 'Cucumber' } },
    created: { type: Date, default: Date.now() },
    customFeatures: Array,
    categoryFeatures: Array,
    moreInfoUrl: String,
    ytVideos: Array,

});

export const ProductModel = mongoose.model('Product', ProductSchema);
