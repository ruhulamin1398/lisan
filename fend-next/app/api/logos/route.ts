import dbConnect from '@/lib/mongodb'
import Logo from '@/models/Logo'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  await dbConnect()
  try {
    const { searchParams } = new URL(request.url)
    const site = searchParams.get('site')
    const filter: Record<string, string> = {}
    if (site) filter.site = site

    const logos = await Logo.find(filter).sort({ displayOrder: 1 })
    return NextResponse.json(logos)
  } catch (error) {
    console.error('Failed to fetch logos:', error)
    return NextResponse.json({ error: 'Failed to fetch logos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  await dbConnect()
  try {
    const body = await request.json()
    const logo = new Logo(body)
    await logo.save()
    return NextResponse.json(logo, { status: 201 })
  } catch (error) {
    console.error('Failed to create logo:', error)
    return NextResponse.json({ error: 'Failed to create logo' }, { status: 500 })
  }
}
