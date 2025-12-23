import mongoose, { Schema, Document } from 'mongoose'

export interface IContactMessage extends Document {
    name: string
    email: string
    phone?: string
    serviceType: mongoose.Types.ObjectId
    message: string
    read: boolean
    createdAt: Date
    updatedAt: Date
}

const ContactMessageSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    serviceType: { type: Schema.Types.ObjectId, ref: 'ServiceType', required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false }
}, {
    timestamps: true
})

export default mongoose.models.ContactMessage || mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema)