import mongoose, { Schema, Document } from 'mongoose'

export interface IPost extends Document {
    title: string
    content: string
    category: mongoose.Types.ObjectId
    published: boolean
    image?: string
}

const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    published: { type: Boolean, default: false },
    image: { type: String }
})

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)