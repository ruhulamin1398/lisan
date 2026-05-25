import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import jwt from 'jsonwebtoken'

interface JWTPayload {
    userId: string
    email: string
    role: string
}

// Middleware to verify JWT token
function verifyToken(request: NextRequest): JWTPayload | null {
    try {
        const authHeader = request.headers.get('authorization')
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null
        }

        const token = authHeader.substring(7)
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as JWTPayload
        return decoded
    } catch (error) {
        return null
    }
}

export async function PUT(request: NextRequest) {
    try {
        await connectDB()

        // Verify authentication
        const decoded = verifyToken(request)
        if (!decoded) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { currentPassword, newPassword } = await request.json()

        // Validate input
        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: 'Current password and new password are required' },
                { status: 400 }
            )
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { error: 'New password must be at least 6 characters long' },
                { status: 400 }
            )
        }

        // Find user
        const user = await (User as any).findOne({ _id: decoded.userId })
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        // Verify current password
        const isCurrentPasswordValid = await user.comparePassword(currentPassword)
        if (!isCurrentPasswordValid) {
            return NextResponse.json(
                { error: 'Current password is incorrect' },
                { status: 400 }
            )
        }

        // Update password
        user.password = newPassword
        await user.save()

        return NextResponse.json({
            message: 'Password changed successfully'
        })

    } catch (error) {
        console.error('Password change error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}