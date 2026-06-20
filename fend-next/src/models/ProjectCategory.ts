import mongoose, { Schema, Document } from 'mongoose'

export interface IProjectCategory extends Document {
    name: string
    description: string
    image?: string
    displayOrder: number
    site: string
}

const ProjectCategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    displayOrder: { type: Number, default: 0 },
    site: { type: String, default: 'ruhul-dev' },
}, {
    timestamps: true,
})

const ProjectCategoryModel = mongoose.models.ProjectCategory || mongoose.model<IProjectCategory>('ProjectCategory', ProjectCategorySchema)
export default ProjectCategoryModel as mongoose.Model<IProjectCategory>
