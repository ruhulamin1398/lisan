import dbConnect from '@/lib/mongodb'
import Category from '@/models/Category'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    await dbConnect()
    try {
        const categories = await Category.find({})
        return NextResponse.json(categories)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    await dbConnect()
    try {
        const { name, description, image } = await request.json()
        const category = new Category({ name, description, image })
        await category.save()
        return NextResponse.json(category, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
    }
}