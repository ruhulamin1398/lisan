import dbConnect from '@/lib/mongodb'
import Post from '@/models/Post'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    await dbConnect()

    try {
        // Get query parameters for filtering
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')
        const limit = searchParams.get('limit')
        const page = searchParams.get('page')

        let query: any = { published: true } // Only show published posts

        // Filter by category if provided
        if (category) {
            query.category = category
        }

        let postsQuery = Post.find(query)
            .populate('category')
            .sort({ createdAt: -1 }) // Most recent first

        // Apply pagination if limit is provided
        if (limit) {
            const limitNum = parseInt(limit)
            const pageNum = page ? parseInt(page) : 1
            const skip = (pageNum - 1) * limitNum

            postsQuery = postsQuery.limit(limitNum).skip(skip)
        }

        const posts = await postsQuery

        // Get total count for pagination
        const total = await Post.countDocuments(query)

        return NextResponse.json({
            posts,
            total,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : undefined
        })

    } catch (error) {
        console.error('Failed to fetch posts:', error)
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        )
    }
}