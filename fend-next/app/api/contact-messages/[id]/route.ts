import dbConnect from '@/lib/mongodb'
import ContactMessage from '@/models/ContactMessage'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, context: any) {
    const params = await context.params
    await dbConnect()
    try {
        const message = await ContactMessage.findById(params.id).populate('serviceType')
        if (!message) {
            return NextResponse.json({ error: 'Contact message not found' }, { status: 404 })
        }
        return NextResponse.json(message)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch contact message' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, context: any) {
    const params = await context.params
    await dbConnect()
    try {
        const { read } = await request.json()
        const message = await ContactMessage.findByIdAndUpdate(
            params.id,
            { read },
            { new: true }
        ).populate('serviceType')

        if (!message) {
            return NextResponse.json({ error: 'Contact message not found' }, { status: 404 })
        }
        return NextResponse.json(message)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update contact message' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, context: any) {
    const params = await context.params
    await dbConnect()
    try {
        const message = await ContactMessage.findByIdAndDelete(params.id)
        if (!message) {
            return NextResponse.json({ error: 'Contact message not found' }, { status: 404 })
        }
        return NextResponse.json({ message: 'Contact message deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete contact message' }, { status: 500 })
    }
}