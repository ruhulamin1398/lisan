import mongoose, { Schema, Document } from 'mongoose'

export interface ICategory extends Document {
    name: string
    description: string
    image?: string
    displayOrder: number
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    displayOrder: { type: Number, default: 0 }
})

const CategoryModel = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema)
export default CategoryModel as mongoose.Model<ICategory>