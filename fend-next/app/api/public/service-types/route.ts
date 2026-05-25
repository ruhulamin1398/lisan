import dbConnect from '@/lib/mongodb'
import ServiceType from '@/models/ServiceType'
import { NextResponse } from 'next/server'

export async function GET() {
    await dbConnect()

    try {
        const serviceTypes = await ServiceType.find({ active: true }).sort({ name: 1 })

        return NextResponse.json(serviceTypes)

    } catch (error) {
        console.error('Failed to fetch service types:', error)
        return NextResponse.json(
            { error: 'Failed to fetch service types' },
            { status: 500 }
        )
    }
}