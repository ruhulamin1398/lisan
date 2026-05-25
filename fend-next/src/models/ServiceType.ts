import mongoose, { Schema, Document } from 'mongoose'

export interface IServiceType extends Document {
    name: string
    description?: string
    active: boolean
    createdAt: Date
    updatedAt: Date
}

const ServiceTypeSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
})

const ServiceTypeModel = mongoose.models.ServiceType || mongoose.model<IServiceType>('ServiceType', ServiceTypeSchema)
export default ServiceTypeModel as mongoose.Model<IServiceType>