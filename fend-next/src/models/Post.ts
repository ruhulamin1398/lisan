import mongoose, { Schema, Document } from 'mongoose'
import './Category' // Ensure Category model is registered for populate

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

const PostModel = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)
export default PostModel as mongoose.Model<IPost>