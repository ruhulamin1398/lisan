import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, context: any) {
  const params = await context.params
  await dbConnect()
  try {
    const project = await Project.findById(params.id)
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json(project)
  } catch (error) {
    console.error('Failed to fetch project:', error)
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: any) {
  const params = await context.params
  await dbConnect()
  try {
    const body = await request.json()
    const project = await Project.findByIdAndUpdate(params.id, body, { new: true })
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json(project)
  } catch (error) {
    console.error('Failed to update project:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: any) {
  const params = await context.params
  await dbConnect()
  try {
    const project = await Project.findByIdAndDelete(params.id)
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Project deleted' })
  } catch (error) {
    console.error('Failed to delete project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
