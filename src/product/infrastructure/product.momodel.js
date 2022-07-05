import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ProductSchema = Schema({
    // _id: { type: mongoose.Types.ObjectId, required: false },
    name: { type: String, required: false },
    brand: {
        _id: { type: Schema.Types.ObjectId, ref: 'Brand' },
        name: String
    },
    category: {
        name: String,
        idsTree: [String],
        breadcrumb: String,
        _id: { type: mongoose.Types.ObjectId, ref: 'Category' },
    },
    images: { type: [String], required: false },
    mainImage: { type: String, required: false },
    stock: { type: Number, required: false },
    description: { type: String, required: false },
    price: {
        cost: { type: Number, default: 0 },
        sale: Number,
        taxs: [{ name: String, amount: Number }],
        percentOfProfit: { type: Number, default: 0 },
    },
    wholesalerData: { type: Object, default: { name: 'Cucumber' } },
    created: { type: Date, default: Date.now() },
    customFeatures: [String],
    categoryFeatures: [String],
    moreInfoUrl: String,
    ytVideos: [String],

});
export const ProductModel = mongoose.model('Product', ProductSchema);


/* 

Price: {
    cost: Number,
    sale: Number,
    taxs: [{ name: String, amount: Number }],
    percentOfProfit: Number,
}

*/