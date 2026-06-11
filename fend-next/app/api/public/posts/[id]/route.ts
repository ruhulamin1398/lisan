import dbConnect from '@/lib/mongodb'
import Post from '@/models/Post'
import Category from '@/models/Category'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, context: any) {
    const params = await context.params
    await dbConnect()

    try {
        const post = await Post.findOne({
            _id: params.id,
            published: true // Only show published posts
        }).populate('category')

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(post)

    } catch (error) {
        console.error('Failed to fetch post:', error)
        return NextResponse.json(
            { error: 'Failed to fetch post' },
            { status: 500 }
        )
    }
}