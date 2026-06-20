import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'
import { NextResponse } from 'next/server'

const SEED_PROJECTS = [
  {
    title: "MuslimBD — Shariah-Based Digital Ecosystem for Muslims",
    category: "Web Apps",
    description: `MuslimBD provides a trusted, faith-driven platform with a live Muslim API today and more Islamic tools coming soon for prayer times, Quran, mosque discovery, dhikr tracking, and developer-first products that support a Shariah-based lifestyle.
<br/>
- Quran verse by verse in multiple languages audio <br/>
- Prayer times <br/>
- API rate limiting <br/> 
`,
    link: "https://www.muslimbd.app/",
    links: [
      { title: "API", url: "https://api.muslimbd.app/" },
      { title: "Documentation", url: "https://api-documentation.muslimbd.app/" },
    ],
    tools: "Express.js, Next.js , GraphQL, MongoDB, Redis, Azure TTS, Docker, Cloud computing",
    site: "ruhul-dev",
    displayOrder: 1,
  },
  {
    title: "Palm USD - The Digital Dollar Built for the Globe",
    category: "Software",
    description: `The global digital dollar. Fully-reserved stablecoin infrastructure backed 1:1 by AED and SAR reserves held in Shariah-compliant instruments at regulated GCC custodians.
<br/>
- $2.8B in circulation <br/>
- 1:1 mint & redeem against AED, SAR, USD <br/>
- Deployed on 4 Testnets <br/> 
`,
    link: "https://www.palmusd.com/",
    links: [
      { title: "Swap", url: "https://getuntethered.xyz/" },
      { title: "Trade", url: "https://www.biconomy.com/exchange/PUSD_USDT" },
      { title: "Documentation", url: "https://www.palmusd.com/pages/developers.html" },
    ],
    tools: "Solidity, Rust, Express.js, Next.js , GraphQL, MongoDB",
    site: "ruhul-dev",
    displayOrder: 2,
  },
  {
    title: "NexUSD - Next-Generation USD Stablecoin",
    category: "Software",
    description: `NEX-USD is a next-generation decentralized USD infrastructure deployed across 10 EVM-compatible test networks. The project focuses on multi-chain scalability, smart contract deployment, and seamless Web3 integration, enabling cross-chain testing, interoperability, and stable digital asset experimentation within a modern blockchain ecosystem.
<br/>
- Trading Bot <br/>
- Deployed on 10 Testnets <br/>
- Custom Wallet <br/> 
- Faucet <br/> 
`,
    link: "https://nex-usd.vercel.app",
    links: [
      { title: "Wallet", url: "https://wallet-nex-usd.vercel.app" },
      { title: "Bot", url: "https://self-transaction-nex-usd-bot.vercel.app" },
    ],
    tools: "Solidity, Express.js, Next.js , GraphQL , MongoDB, Redis, Docker, Cloud computing",
    site: "ruhul-dev",
    displayOrder: 3,
  },
  {
    title: "Beejoyi | Showcase Your Talent & Win Big!",
    category: "Web Apps",
    description: "A full-featured Web2 application built with Material UI, Next.js, GraphQL, MongoDB, Redux, and more. The platform supports server-side rendering, real-time data updates, and a responsive UI. Features include authentication, user profiles, dashboards, and advanced search.",
    link: "https://beejoyi.com/",
    tools: "Next.js , GraphQL , MongoDB, Redux, Material UI, Node.js, JWT Auth",
    site: "ruhul-dev",
    displayOrder: 4,
  },
  {
    title: "Lottaverse: A New Era of Blockchain Lottery.",
    category: "Blockchain",
    description: "Developed Lottavarse, a blockchain-based lottery application on Polygon, leveraging Chainlink VRF for fair winner selection. Features include diverse lottery types, multi-winner formats, premium user commissions, uni-level referrals, bonuses for top leaders and buyers, and reward-based purchases with commission withdrawal options.",
    link: "https://lottaverse-v2-0.vercel.app/",
    tools: "Polygon, Chainlink, Solidity, NextJs, Ethers, Wagmi, Infura, Foundry, MetaMask",
    site: "ruhul-dev",
    displayOrder: 5,
  },
  {
    title: "Billy The Blue Whale NFT Collection.",
    category: "Blockchain",
    description: "Developed Lottavarse, a blockchain-based lottery application on Polygon, leveraging Chainlink VRF for fair winner selection. Features include diverse lottery types, multi-winner formats, premium user commissions, uni-level referrals, bonuses for top leaders and buyers, and reward-based purchases with commission withdrawal options.",
    link: "https://www.bluewhalenft.com",
    tools: "Blockchain, NFT, Solana, Next.js, Magic Eden, Smart Contract, Web3.js, MetaMask",
    site: "ruhul-dev",
    displayOrder: 6,
  },
  {
    title: "SecureDoc: AI-Powered Blockchain-Based Certificate Authentication",
    category: "Blockchain",
    description: "SecureDoc is a government-funded, AI-powered blockchain solution on Ethereum for secure academic certificate authentication. The platform includes an admin application to manage university subscriptions and tokens, supporting institutional control. Universities use a dedicated dApp to handle student data, including options to disqualify or reissue certificates, while students benefit from a privacy-focused dApp for secure, accessible document management. A verifier application provides an efficient, trustworthy way for authorized parties to validate and view certificates. Designed for scalability and privacy, SecureDoc ensures academic credentials are authentic and accessible while offering robust privacy and secure verification, revolutionizing document authentication standards.",
    link: "",
    tools: "AI, Ethereum, Smart Contract, ReactJs, Ethers, HardHat, Alchemy, MetaMask",
    site: "ruhul-dev",
    displayOrder: 7,
  },
  {
    title: "Blockchain Drive: Securing Data on the Ethereum & IPFS",
    category: "Blockchain",
    description: "Blockchain Drive is a data security solution on Ethereum and IPFS, enabling file uploads via IPFS (Pinata) with Ethereum-backed storage links. It integrates with MetaMask for seamless access, allowing users to share or revoke file access through secure blockchain-based controls.",
    link: "http://blockchain-drive.ruhul.info/",
    tools: "Ethereum, Smart Contract, ReactJs, Ethers, Tailwind CSS, MetaMask",
    site: "ruhul-dev",
    displayOrder: 8,
  },
  {
    title: "Aurex — Enterprise-Grade Web3 Staking Platform",
    category: "Blockchain",
    description: "Aurex is an enterprise-grade Web3 staking platform enabling businesses and individuals to stake digital assets and earn passive yield through secure, audited on-chain mechanisms. It combines institutional-level controls with a clean staking interface, positioning itself as a full-stack solution for the decentralized economy.",
    image: "https://www.blockwhizz.com/assets/aurex-A34WIKgU.webp",
    link: "https://www.blockwhizz.com/",
    tools: "Figma, React, Tailwind CSS, Web3, Staking, Smart Contracts",
    site: "ruhul-dev",
    displayOrder: 9,
  },
]

export async function GET() {
  await dbConnect()
  try {
    // Check if already seeded
    const count = await Project.countDocuments({ site: 'ruhul-dev' })
    if (count > 0) {
      return NextResponse.json({
        message: `Database already has ${count} projects for site 'ruhul-dev'. No action taken.`,
        count,
      })
    }

    const inserted = await Project.insertMany(SEED_PROJECTS)
    return NextResponse.json({
      message: `Seeded ${inserted.length} projects successfully!`,
      count: inserted.length,
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Failed to seed projects' }, { status: 500 })
  }
}
