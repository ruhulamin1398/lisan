import dbConnect from '@/lib/mongodb'
import ContactMessage from '@/models/ContactMessage'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    await dbConnect()
    try {
        const messages = await ContactMessage.find({})
            .populate('serviceType')
            .sort({ createdAt: -1 })
        return NextResponse.json(messages)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch contact messages' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    await dbConnect()
    try {
        const { name, email, phone, serviceType, message } = await request.json()

        // Validate required fields
        if (!name || !email || !serviceType || !message) {
            return NextResponse.json(
                { error: 'Name, email, service type, and message are required' },
                { status: 400 }
            )
        }

        const contactMessage = new ContactMessage({
            name,
            email,
            phone,
            serviceType,
            message
        })

        await contactMessage.save()
        const populatedMessage = await ContactMessage.findById(contactMessage._id).populate('serviceType')

        return NextResponse.json(populatedMessage, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save contact message' }, { status: 500 })
    }
}