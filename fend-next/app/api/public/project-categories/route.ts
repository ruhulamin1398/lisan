import dbConnect from '@/lib/mongodb'
import ProjectCategory from '@/models/ProjectCategory'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    await dbConnect()
    try {
        const { searchParams } = new URL(request.url)
        const site = searchParams.get('site') || 'ruhul-dev'

        const categories = await ProjectCategory.find({ site })
            .select('-__v')
            .sort({ displayOrder: 1, name: 1 })

        return NextResponse.json(categories)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch project categories' }, { status: 500 })
    }
}
