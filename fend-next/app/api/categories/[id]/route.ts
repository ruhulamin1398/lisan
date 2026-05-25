import dbConnect from '@/lib/mongodb'
import Category from '@/models/Category'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, context: any) {
    const params = await context.params
    await dbConnect()
    try {
        const category = await Category.findById(params.id)
        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 })
        }
        return NextResponse.json(category)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, context: any) {
    const params = await context.params
    await dbConnect()
    try {
        const { name, description, image } = await request.json()
        const category = await Category.findByIdAndUpdate(params.id, { name, description, image }, { new: true })
        return NextResponse.json(category)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, context: any) {
    const params = await context.params
    await dbConnect()
    try {
        await Category.findByIdAndDelete(params.id)
        return NextResponse.json({ message: 'Category deleted' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
    }
}