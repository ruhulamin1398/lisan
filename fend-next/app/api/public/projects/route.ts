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

    const projects = await Project.find(filter)
      .select('-__v')
      .sort({ displayOrder: 1 })

    return NextResponse.json({
      title: "Feature Projects",
      description: "Here are some of my featured projects that showcase my expertise in full-stack and blockchain development.",
      projects: projects.map(p => ({
        id: p.displayOrder,
        category: p.category,
        title: p.title,
        description: p.description,
        image: p.image,
        link: p.link,
        links: p.links,
        tools: p.tools,
      })),
    })
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}
