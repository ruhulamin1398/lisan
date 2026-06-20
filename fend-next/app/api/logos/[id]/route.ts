import dbConnect from '@/lib/mongodb'
import Logo from '@/models/Logo'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, context: any) {
  const params = await context.params
  await dbConnect()
  try {
    const logo = await Logo.findById(params.id)
    if (!logo) {
      return NextResponse.json({ error: 'Logo not found' }, { status: 404 })
    }
    return NextResponse.json(logo)
  } catch (error) {
    console.error('Failed to fetch logo:', error)
    return NextResponse.json({ error: 'Failed to fetch logo' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: any) {
  const params = await context.params
  await dbConnect()
  try {
    const body = await request.json()
    const logo = await Logo.findByIdAndUpdate(params.id, body, { new: true })
    if (!logo) {
      return NextResponse.json({ error: 'Logo not found' }, { status: 404 })
    }
    return NextResponse.json(logo)
  } catch (error) {
    console.error('Failed to update logo:', error)
    return NextResponse.json({ error: 'Failed to update logo' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: any) {
  const params = await context.params
  await dbConnect()
  try {
    const logo = await Logo.findByIdAndDelete(params.id)
    if (!logo) {
      return NextResponse.json({ error: 'Logo not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Logo deleted' })
  } catch (error) {
    console.error('Failed to delete logo:', error)
    return NextResponse.json({ error: 'Failed to delete logo' }, { status: 500 })
  }
}
