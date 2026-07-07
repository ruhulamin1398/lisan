import dbConnect from '@/lib/mongodb'
import Post from '@/models/Post'
import Category from '@/models/Category'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, context: any) {
    const params = await context.params
    await dbConnect()
    try {
        const post = await Post.findById(params.id).populate('category')
        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 })
        }
        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, context: any) {
    const params = await context.params
    await dbConnect()
    try {
        const { title, content, category, published, image, imagePrompt } = await request.json()
        const post = await Post.findByIdAndUpdate(params.id, { title, content, category, published, image, imagePrompt }, { new: true }).populate('category')
        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, context: any) {
    const params = await context.params
    await dbConnect()
    try {
        await Post.findByIdAndDelete(params.id)
        return NextResponse.json({ message: 'Post deleted' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
    }
}