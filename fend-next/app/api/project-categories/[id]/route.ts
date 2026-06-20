import dbConnect from '@/lib/mongodb'
import ProjectCategory from '@/models/ProjectCategory'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, context: any) {
    const params = await context.params
    await dbConnect()
    try {
        const category = await ProjectCategory.findById(params.id)
        if (!category) {
            return NextResponse.json({ error: 'Project category not found' }, { status: 404 })
        }
        return NextResponse.json(category)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch project category' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, context: any) {
    const params = await context.params
    await dbConnect()
    try {
        const { name, description, image, displayOrder, site } = await request.json()
        const category = await ProjectCategory.findByIdAndUpdate(
            params.id,
            { name, description, image, displayOrder, site },
            { new: true }
        )
        if (!category) {
            return NextResponse.json({ error: 'Project category not found' }, { status: 404 })
        }
        return NextResponse.json(category)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update project category' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, context: any) {
    const params = await context.params
    await dbConnect()
    try {
        const category = await ProjectCategory.findByIdAndDelete(params.id)
        if (!category) {
            return NextResponse.json({ error: 'Project category not found' }, { status: 404 })
        }
        return NextResponse.json({ message: 'Project category deleted' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project category' }, { status: 500 })
    }
}
