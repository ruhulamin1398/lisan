import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  await dbConnect()
  try {
    const { searchParams } = new URL(request.url)
    const site = searchParams.get('site')
    const filter: Record<string, string> = {}
    if (site) filter.site = site

    const projects = await Project.find(filter).sort({ displayOrder: 1 })
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  await dbConnect()
  try {
    const body = await request.json()
    const project = new Project(body)
    await project.save()
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Failed to create project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
