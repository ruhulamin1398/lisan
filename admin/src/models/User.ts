import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
    name: string
    email: string
    password: string
    role: 'admin' | 'editor'
    createdAt: Date
    updatedAt: Date
    comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'editor'], default: 'editor' }
}, {
    timestamps: true
})

// Hash password before saving
UserSchema.pre('save', async function(next) {
    const user = this as any

    if (!user.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(12)
        user.password = await bcrypt.hash(user.password, salt)
        next()
    } catch (error: any) {
        next(error)
    }
})

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)