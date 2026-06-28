import dbConnect from '@/lib/mongodb'
import FileModel from '@/models/File'
import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect()
  try {
    const { id } = await params
    const body = await request.json()
    const file = await FileModel.findByIdAndUpdate(id, body, { new: true })
    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }
    return NextResponse.json(file)
  } catch (error) {
    console.error('Failed to update file:', error)
    return NextResponse.json({ error: 'Failed to update file' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect()
  try {
    const { id } = await params
    const file = await FileModel.findById(id)
    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Delete from Cloudinary if we have a publicId
    if (file.publicId) {
      try {
        await cloudinary.uploader.destroy(file.publicId)
      } catch (cloudErr) {
        console.warn('Cloudinary delete failed (may not exist):', cloudErr)
      }
    }

    await FileModel.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete file:', error)
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}
