import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ProductSchema = Schema({
  // _id: { type: mongoose.Types.ObjectId, required: false },
  name: { type: String, required: false },
  brand: {
    _id: { type: Schema.Types.ObjectId, ref: "Brand" },
    name: String,
  },
  category: {
    name: String,
    idsTree: [String],
    breadcrumb: String,
    _id: { type: mongoose.Types.ObjectId, ref: "Category" },
  },
  images: { type: [String], required: false },
  mainImage: { type: String, required: false },
  stock: { type: Number, required: false },
  description: { type: String, required: false },
  price: {
    cost: { type: Number, default: 0 },
    sale: { type: Number, required: true },
    taxs: [{ name: String, amount: Number }],
    percentOfProfit: { type: Number, default: 0 },
  },
  wholesalerData: {
    wholesalerId: { type: Schema.Types.ObjectId, ref: "Wholesaler" },
    name: { type: String, default: "Cucumber" },
    productPageUrl: String,
    productCode: { type: String, unique: true },
    images: [String],
    description: String,
  },
  created: { type: Date, default: Date.now() },
  customFeatures: [{}],
  categoryFeatures: [{}],
  moreInfoUrl: String,
  ytVideos: [String],
});
export const ProductModel = mongoose.model("Product", ProductSchema);

/* 

Price: {
    cost: Number,
    sale: Number,
    taxs: [{ name: String, amount: Number }],
    percentOfProfit: Number,
}

*/
