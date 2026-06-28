import dbConnect from '@/lib/mongodb'
import FileModel from '@/models/File'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  await dbConnect()
  try {
    const { searchParams } = new URL(request.url)
    const source = searchParams.get('source')
    const site = searchParams.get('site')
    const type = searchParams.get('type')
    const search = searchParams.get('search')

    const filter: Record<string, any> = {}
    if (source) filter.source = source
    if (site) filter.site = site
    if (type) filter.type = type
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { sourcePath: { $regex: search, $options: 'i' } },
        { alt: { $regex: search, $options: 'i' } },
      ]
    }

    const files = await FileModel.find(filter)
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json(files)
  } catch (error) {
    console.error('Failed to fetch files:', error)
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  await dbConnect()
  try {
    const body = await request.json()
    const file = new FileModel(body)
    await file.save()
    return NextResponse.json(file, { status: 201 })
  } catch (error) {
    console.error('Failed to create file record:', error)
    return NextResponse.json({ error: 'Failed to create file record' }, { status: 500 })
  }
}
