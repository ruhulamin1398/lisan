import mongoose, { Schema, Document } from 'mongoose'

export interface ILogo extends Document {
  title: string
  logoType: 'icon' | 'image' | 'svg'
  logoKey: string
  customStyle: string
  displayOrder: number
  site: string
}

const LogoSchema: Schema = new Schema({
  title: { type: String, required: true },
  logoType: {
    type: String,
    enum: ['icon', 'image', 'svg'],
    required: true,
    default: 'icon',
  },
  logoKey: { type: String, required: true },
  customStyle: { type: String, default: 'text-[#c8c8c8]' },
  displayOrder: { type: Number, default: 0 },
  site: { type: String, default: 'ruhul-dev' },
}, {
  timestamps: true,
})

const LogoModel = mongoose.models.Logo || mongoose.model<ILogo>('Logo', LogoSchema)
export default LogoModel as mongoose.Model<ILogo>
