import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

if (!GOOGLE_CLIENT_ID) {
    throw new Error('Please define GOOGLE_CLIENT_ID or NEXT_PUBLIC_GOOGLE_CLIENT_ID in the environment')
}

export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const { credential } = await request.json()
        if (!credential) {
            return NextResponse.json({ error: 'Google credential is required' }, { status: 400 })
        }

        const googleResponse = await fetch(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
        )

        if (!googleResponse.ok) {
            return NextResponse.json({ error: 'Invalid Google credential' }, { status: 401 })
        }

        const payload = await googleResponse.json()
        if (payload.aud !== GOOGLE_CLIENT_ID) {
            return NextResponse.json({ error: 'Google client ID mismatch' }, { status: 401 })
        }

        if (!payload.email) {
            return NextResponse.json({ error: 'Google account does not provide an email' }, { status: 400 })
        }

        const email = payload.email as string
        const name = (payload.name as string) || email.split('@')[0]
        const emailVerified = payload.email_verified === 'true' || payload.email_verified === true
        if (!emailVerified) {
            return NextResponse.json({ error: 'Google email not verified' }, { status: 401 })
        }

        let user = await User.findOne({ email })
        if (!user) {
            const randomPassword = crypto.randomBytes(16).toString('hex')
            user = new User({
                name,
                email,
                password: randomPassword,
                role: 'user',
            })
            await user.save()
        }

        if (user.role !== 'admin') {
            return NextResponse.json({ error: 'You are not an admin' }, { status: 403 })
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        )

        return NextResponse.json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        })
    } catch (error) {
        console.error('Google auth error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
