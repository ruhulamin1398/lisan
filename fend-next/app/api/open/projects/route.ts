import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  await dbConnect()
  try {
    const { searchParams } = new URL(request.url)
    const site = searchParams.get('site') || 'ruhul-dev'
    const category = searchParams.get('category')

    const filter: Record<string, string> = { site }
    if (category) filter.category = category

    const projects = await Project.find(filter)
      .select('-__v -_id')
      .sort({ displayOrder: 1 })
      .lean()

    const response = NextResponse.json(projects, { status: 200 })

    // CORS headers — allow any origin for open API
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=600')

    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 })
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  return response
}
