import dbConnect from '@/lib/mongodb'
import Logo from '@/models/Logo'
import { NextResponse } from 'next/server'

const SEED_LOGOS_RUHUL_DEV = [
  { title: 'Ethereum', logoType: 'icon', logoKey: 'ethereum', customStyle: 'text-[#c8c8c8]', displayOrder: 1, site: 'ruhul-dev' },
  { title: 'Hyperledger Fabric', logoType: 'image', logoKey: 'fabric', customStyle: 'text-[#c8c8c8]', displayOrder: 2, site: 'ruhul-dev' },
  { title: 'Solana', logoType: 'icon', logoKey: 'solana', customStyle: 'text-[#c8c8c8]', displayOrder: 3, site: 'ruhul-dev' },
  { title: 'Solidity', logoType: 'icon', logoKey: 'solidity', customStyle: 'text-[#c8c8c8]', displayOrder: 4, site: 'ruhul-dev' },
  { title: 'Hard Hat', logoType: 'svg', logoKey: 'hardhat', customStyle: 'text-[#c8c8c8]', displayOrder: 5, site: 'ruhul-dev' },
  { title: 'MetaMask', logoType: 'image', logoKey: 'metamask', customStyle: 'text-[#c8c8c8]', displayOrder: 6, site: 'ruhul-dev' },
  { title: 'IPFS', logoType: 'icon', logoKey: 'ipfs', customStyle: 'text-[#c8c8c8]', displayOrder: 7, site: 'ruhul-dev' },
  { title: 'Ether.js', logoType: 'svg', logoKey: 'etherjs', customStyle: 'text-[#c8c8c8]', displayOrder: 8, site: 'ruhul-dev' },
  { title: 'Node.js', logoType: 'icon', logoKey: 'nodejs', customStyle: 'text-[#c8c8c8]', displayOrder: 9, site: 'ruhul-dev' },
  { title: 'React', logoType: 'icon', logoKey: 'reactjs', customStyle: 'text-[#c8c8c8]', displayOrder: 10, site: 'ruhul-dev' },
  { title: 'PHP', logoType: 'icon', logoKey: 'php', customStyle: 'text-[#c8c8c8]', displayOrder: 11, site: 'ruhul-dev' },
  { title: 'Tailwind CSS', logoType: 'icon', logoKey: 'tailwindcss', customStyle: 'text-[#c8c8c8]', displayOrder: 12, site: 'ruhul-dev' },
  { title: 'MySQL', logoType: 'icon', logoKey: 'mysql', customStyle: 'text-[#c8c8c8]', displayOrder: 13, site: 'ruhul-dev' },
  { title: 'MongoDB', logoType: 'icon', logoKey: 'mongodb', customStyle: 'text-[#c8c8c8]', displayOrder: 14, site: 'ruhul-dev' },
  { title: 'Docker', logoType: 'icon', logoKey: 'docker', customStyle: 'text-[#c8c8c8]', displayOrder: 15, site: 'ruhul-dev' },
  { title: 'AWS', logoType: 'icon', logoKey: 'aws', customStyle: 'text-[#c8c8c8]', displayOrder: 16, site: 'ruhul-dev' },
]

const SEED_LOGOS_LISAN = [
  { title: 'Ethereum', logoType: 'icon', logoKey: 'ethereum', customStyle: 'text-[#c8c8c8]', displayOrder: 1, site: 'lisan' },
  { title: 'Hyperledger Fabric', logoType: 'image', logoKey: 'fabric', customStyle: 'text-[#c8c8c8]', displayOrder: 2, site: 'lisan' },
  { title: 'Solana', logoType: 'icon', logoKey: 'solana', customStyle: 'text-[#c8c8c8]', displayOrder: 3, site: 'lisan' },
  { title: 'Solidity', logoType: 'icon', logoKey: 'solidity', customStyle: 'text-[#c8c8c8]', displayOrder: 4, site: 'lisan' },
  { title: 'Hard Hat', logoType: 'svg', logoKey: 'hardhat', customStyle: 'text-[#c8c8c8]', displayOrder: 5, site: 'lisan' },
  { title: 'MetaMask', logoType: 'image', logoKey: 'metamask', customStyle: 'text-[#c8c8c8]', displayOrder: 6, site: 'lisan' },
  { title: 'IPFS', logoType: 'icon', logoKey: 'ipfs', customStyle: 'text-[#c8c8c8]', displayOrder: 7, site: 'lisan' },
  { title: 'Ether.js', logoType: 'svg', logoKey: 'etherjs', customStyle: 'text-[#c8c8c8]', displayOrder: 8, site: 'lisan' },
  { title: 'Node.js', logoType: 'icon', logoKey: 'nodejs', customStyle: 'text-[#c8c8c8]', displayOrder: 9, site: 'lisan' },
  { title: 'React', logoType: 'icon', logoKey: 'reactjs', customStyle: 'text-[#c8c8c8]', displayOrder: 10, site: 'lisan' },
  { title: 'PHP', logoType: 'icon', logoKey: 'php', customStyle: 'text-[#c8c8c8]', displayOrder: 11, site: 'lisan' },
  { title: 'Tailwind CSS', logoType: 'icon', logoKey: 'tailwindcss', customStyle: 'text-[#c8c8c8]', displayOrder: 12, site: 'lisan' },
  { title: 'MySQL', logoType: 'icon', logoKey: 'mysql', customStyle: 'text-[#c8c8c8]', displayOrder: 13, site: 'lisan' },
  { title: 'MongoDB', logoType: 'icon', logoKey: 'mongodb', customStyle: 'text-[#c8c8c8]', displayOrder: 14, site: 'lisan' },
  { title: 'Docker', logoType: 'icon', logoKey: 'docker', customStyle: 'text-[#c8c8c8]', displayOrder: 15, site: 'lisan' },
  { title: 'AWS', logoType: 'icon', logoKey: 'aws', customStyle: 'text-[#c8c8c8]', displayOrder: 16, site: 'lisan' },
]

const ALL_SEED_DATA = [...SEED_LOGOS_RUHUL_DEV, ...SEED_LOGOS_LISAN]

export async function GET() {
  await dbConnect()
  try {
    const count = await Logo.countDocuments()
    if (count > 0) {
      return NextResponse.json({
        message: `Database already has ${count} logos. No action taken.`,
        count,
      })
    }

    const inserted = await Logo.insertMany(ALL_SEED_DATA)
    return NextResponse.json({
      message: `Seeded ${inserted.length} logos successfully!`,
      count: inserted.length,
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Failed to seed logos' }, { status: 500 })
  }
}
