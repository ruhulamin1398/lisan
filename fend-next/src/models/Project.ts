import mongoose, { Schema, Document } from 'mongoose'

export interface IProjectLink {
  title: string
  url: string
}

export interface IProject extends Document {
  title: string
  category: string
  description: string
  image?: string
  link?: string
  links: IProjectLink[]
  tools?: string
  site: string
  displayOrder: number
}

const ProjectLinkSchema: Schema = new Schema({
  title: { type: String },
  url: { type: String },
}, { _id: false })

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  link: { type: String },
  links: [ProjectLinkSchema],
  tools: { type: String },
  site: { type: String, default: 'ruhul-dev' },
  displayOrder: { type: Number, default: 0 },
}, {
  timestamps: true,
})

const ProjectModel = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)
export default ProjectModel as mongoose.Model<IProject>
