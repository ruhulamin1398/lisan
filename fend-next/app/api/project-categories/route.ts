import dbConnect from '@/lib/mongodb'
import ProjectCategory from '@/models/ProjectCategory'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    await dbConnect()
    try {
        const { searchParams } = new URL(request.url)
        const site = searchParams.get('site')
        const filter: Record<string, string> = {}
        if (site) filter.site = site

        const categories = await ProjectCategory.find(filter).sort({ displayOrder: 1, name: 1 })
        return NextResponse.json(categories)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch project categories' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    await dbConnect()
    try {
        const { name, description, image, displayOrder, site } = await request.json()
        const category = new ProjectCategory({ name, description, image, displayOrder, site })
        await category.save()
        return NextResponse.json(category, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create project category' }, { status: 500 })
    }
}
