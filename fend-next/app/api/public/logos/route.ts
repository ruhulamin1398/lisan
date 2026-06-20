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

    const logos = await Logo.find(filter)
      .select('-__v')
      .sort({ displayOrder: 1 })

    return NextResponse.json(logos)
  } catch (error) {
    console.error('Failed to fetch logos:', error)
    return NextResponse.json({ error: 'Failed to fetch logos' }, { status: 500 })
  }
}
