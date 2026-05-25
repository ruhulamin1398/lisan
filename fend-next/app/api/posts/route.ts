import dbConnect from '@/lib/mongodb'
import Post from '@/models/Post'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    await dbConnect()
    try {
        const posts = await Post.find({}).populate('category')
        return NextResponse.json(posts)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    await dbConnect()
    try {
        const { title, content, category, published, image } = await request.json()
        const post = new Post({ title, content, category, published, image })
        await post.save()
        const populatedPost = await Post.findById(post._id).populate('category')
        return NextResponse.json(populatedPost, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
    }
}