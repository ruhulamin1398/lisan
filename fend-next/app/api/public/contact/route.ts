import dbConnect from '@/lib/mongodb'
import ContactMessage from '@/models/ContactMessage'
import { NextRequest, NextResponse } from 'next/server'

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

        return NextResponse.json({
            message: 'Contact message sent successfully',
            data: populatedMessage
        }, { status: 201 })

    } catch (error) {
        console.error('Failed to save contact message:', error)
        return NextResponse.json(
            { error: 'Failed to send contact message' },
            { status: 500 }
        )
    }
}