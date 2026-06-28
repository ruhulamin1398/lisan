import dbConnect from '@/lib/mongodb'
import FileModel from '@/models/File'
import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const source = (formData.get('source') as string) || 'General'
    const sourceId = (formData.get('sourceId') as string) || ''
    const sourcePath = (formData.get('sourcePath') as string) || ''
    const title = (formData.get('title') as string) || file.name || 'Untitled'
    const alt = (formData.get('alt') as string) || ''
    const site = (formData.get('site') as string) || 'ruhul-dev'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Detect type
    const mimeType = file.type || 'application/octet-stream'
    const type = mimeType.startsWith('image') ? 'image'
      : mimeType.startsWith('video') ? 'video'
      : mimeType.startsWith('application') ? 'document'
      : 'other'

    // Upload to Cloudinary
    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `blog-admin/${source.toLowerCase()}`,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    // Save file record to DB
    await dbConnect()
    const fileRecord = new FileModel({
      title,
      url: result.secure_url,
      publicId: result.public_id,
      type,
      mimeType,
      size: result.bytes || file.size,
      width: result.width,
      height: result.height,
      alt,
      source,
      sourceId,
      sourcePath,
      site,
    })
    await fileRecord.save()

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      file: fileRecord,
      _id: fileRecord._id,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}