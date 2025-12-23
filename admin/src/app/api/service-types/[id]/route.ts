import dbConnect from '@/lib/mongodb'
import ServiceType from '@/models/ServiceType'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect()
    try {
        const serviceType = await ServiceType.findById(params.id)
        if (!serviceType) {
            return NextResponse.json({ error: 'Service type not found' }, { status: 404 })
        }
        return NextResponse.json(serviceType)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch service type' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect()
    try {
        const { name, description, active } = await request.json()
        const serviceType = await ServiceType.findByIdAndUpdate(
            params.id,
            { name, description, active },
            { new: true }
        )
        if (!serviceType) {
            return NextResponse.json({ error: 'Service type not found' }, { status: 404 })
        }
        return NextResponse.json(serviceType)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update service type' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect()
    try {
        const serviceType = await ServiceType.findByIdAndDelete(params.id)
        if (!serviceType) {
            return NextResponse.json({ error: 'Service type not found' }, { status: 404 })
        }
        return NextResponse.json({ message: 'Service type deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete service type' }, { status: 500 })
    }
}