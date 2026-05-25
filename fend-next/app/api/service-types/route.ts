import dbConnect from '@/lib/mongodb'
import ServiceType from '@/models/ServiceType'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    await dbConnect()
    try {
        const serviceTypes = await ServiceType.find({}).sort({ name: 1 })
        return NextResponse.json(serviceTypes)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch service types' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    await dbConnect()
    try {
        const { name, description, active } = await request.json()
        const serviceType = new ServiceType({ name, description, active })
        await serviceType.save()
        return NextResponse.json(serviceType, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create service type' }, { status: 500 })
    }
}