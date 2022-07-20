import mongoose from 'mongoose'
const Schema = mongoose.Schema
const BrandSchema = Schema({
    name: { type: String, required: true, unique: true },
    logo: { type: String }
})
export const BrandModel = mongoose.model('Brand', BrandSchema)
