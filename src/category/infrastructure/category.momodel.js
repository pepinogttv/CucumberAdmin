import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    tree: { type: [String], required: true },
    idsTree: { type: [String], required: true },
    breadcrumb: { type: String, unique: true, required: true },
    features: { type: [String], required: false },
    isFirstParent: Boolean,
    name: { type: String, required: true },
    created: { type: Date, default: Date.now() },
    updated: { type: Date, default: Date.now() },

});

export const CategoryModel = mongoose.model("Category", CategorySchema);
