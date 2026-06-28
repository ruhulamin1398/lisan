import mongoose, { Schema, Document } from 'mongoose'

export interface IFile extends Document {
  title: string
  url: string
  publicId?: string
  type: string        // 'image' | 'document' | 'video' | 'other'
  mimeType: string
  size?: number       // bytes
  width?: number
  height?: number
  alt?: string
  source: string      // e.g. 'Projects', 'Blog', 'Logos', 'General'
  sourceId?: string   // reference to the entity ID (project._id, post._id, etc.)
  sourcePath?: string // human-readable path like "Projects > MuslimBD"
  site?: string
}

const FileSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  publicId: { type: String },
  type: {
    type: String,
    enum: ['image', 'document', 'video', 'other'],
    default: 'other',
  },
  mimeType: { type: String, default: '' },
  size: { type: Number },
  width: { type: Number },
  height: { type: Number },
  alt: { type: String, default: '' },
  source: { type: String, default: 'General' },
  sourceId: { type: String },
  sourcePath: { type: String, default: '' },
  site: { type: String, default: 'ruhul-dev' },
}, {
  timestamps: true,
})

// Index for searching
FileSchema.index({ title: 'text', source: 'text', sourcePath: 'text' })
FileSchema.index({ source: 1 })
FileSchema.index({ createdAt: -1 })

const FileModel = mongoose.models.File || mongoose.model<IFile>('File', FileSchema)
export default FileModel as mongoose.Model<IFile>
