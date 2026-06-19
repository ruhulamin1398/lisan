import {
  RiFacebookFill,
  RiGithubFill,
  RiLinkedinFill,
  RiMailFill,
  RiTwitterXFill,
  RiWhatsappFill,
} from "react-icons/ri";

import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

import demo from "../../images/demo.png";
import Lottaverse from "../../images/project/lottaverse.png";
import SecureDoc from "../../images/project/securedoc.png";
import Billy from "../../images/project/billy.png";
import Drive from "../../images/project/drive.png";

import abasasImg from "../../images/abasas.png";
import aakImg from "../../images/aak.png";
import bcImg from "../../images/bc.png";
import freelanceImg from "../../images/freelance.png";
import harborviewImg from "../../images/harborview.png";

import Beejoyi from "../../images/project/beejoyi.png";
import NexUsd from "../../images/project/nex-usd.png";
import PalmUsd from "../../images/project/palm.png";
import Muslimbd from "../../images/project/muslimbd.png";
import abi from "./Transactions.json";
import { GiArchiveResearch, GiTeacher } from "react-icons/gi";
import { MdOutlineDeveloperBoard } from "react-icons/md";
import {
  FaEthereum,
  FaNodeJs,
  FaReact,
  FaPhp,
  FaDocker,
  FaAws,
  FaResearchgate,
  FaGoogleScholar,
} from "react-icons/fa6";
import { TbCurrencySolana } from "react-icons/tb";
import { SiSolidity, SiTailwindcss, SiMysql, SiMongodb } from "react-icons/si";

import basementsportsImg from "../../images/basementspor.png";
import { SiIpfs } from "react-icons/si";

import fabricLogo from "../../images/hlf2.png";
import metamaskLogo from "../../images/metamask.png";

export const configRuhulDev = {
  settings: {
    logos: false,
    services: true,
    projects: true,
    blog: true,
    research: false,
    reviewing: false,
    experience: true,
    researchArea: true,
  },
  title: "Ruhul Amin - Full Stack Developer & Researcher",
  name: "Ruhul Amin",
  socialLinks: {
    linkedin: {
      link: "https://www.linkedin.com/in/theruhulamin/",
      title: "LinkedIn",
      Icon: RiLinkedinFill,
      color: "#2952E3",
      text: "linkedin.com/in/theruhulamin",
    },
    github: {
      link: "https://github.com/ruhulamin1398",
      title: "GitHub",
      text: "ruhulamin1398",
      Icon: RiGithubFill,
      color: "#25D366",
    },
    // facebook: {
    //   link: "https://facebook.com/ruhulamin.official",
    //   title: "Facebook",
    //   Icon: RiFacebookFill,
    //   color: "#1877F3",
    // },
    // twitter: {
    //   link: "https://twitter.com/ruhulamin99",
    //   title: "Twitter",
    //   Icon: RiTwitterXFill,
    //   color: "#2952E3",
    // },
    email: {
      link: "mailto:ruhulamin010398@gmail.com",
      title: "Email",
      text: "ruhulamin010398@gmail.com",
      Icon: RiMailFill,
      color: "#EA4335",
    },
    whatsapp: {
      link: "https://wa.me/8801840000408",
      title: "Whatsapp",
      text: "+880184 0000 408",
      Icon: RiWhatsappFill,
      color: "#25D366",
    },
  },
  researchLinks: {
    googleScholar: {
      link: "https://scholar.google.com/citations?user=pW39RGYAAAAJ&hl",
      title: "Google Scholar",
      text: "RuhulAmin",
      Icon: FaGoogleScholar,
      color: "#EA4335",
    },
    researchGate: {
      link: "https://www.researchgate.net/profile/Ruhul-Amin-95",
      title: "ResearchGate",
      text: "Ruhul-Amin-95",
      Icon: FaResearchgate,
      color: "#EA4335",
    },
  },
  heroContent: {
    name: "RUHUL AMIN",
    tagLine: "Working as Full-stack and Blockchain Developer.",
    overViewList: [
      {
        title: "Full-stack Developer",
        description:
          "6+ years Experience in Web Development.  <br/> Expertise in Express.js, Next.js, Cloud Computing.",
        icon: <MdOutlineDeveloperBoard fontSize={21} className="text-white" />,
        color: "bg-[#8945F8]",
      },
      {
        title: "Blockchain Developer",
        description:
          "3+ year experience in Full-stack Blockchain development <br/> Expertise in Smart Contract development and Integration.",
        icon: <MdOutlineDeveloperBoard fontSize={21} className="text-white" />,
        color: "bg-[#8945F8]",
      },
      {
        title: "Researcher",
        description:
          "Published 10+ Research Papers. <br/> Supervised 20+ students. <br/> Reviewed 50+ Papers.",
        icon: <GiArchiveResearch fontSize={21} className="text-white" />,
        color: "bg-[#2952E3]",
      },
    ],
  },
  servicesPage: [
    {
      title: "Web Development Services",
      des: "I provide comprehensive web development services, including full-stack development with React and Node.js, custom WordPress sites, and scalable Shopify stores. Additionally, I offer API development and IT consulting to ensure seamless integration, performance optimization, and security across your digital infrastructure, helping you achieve your business goals efficiently.",
      list: [
        {
          title: "IT Consulting",
          subtitle:
            "Get expert guidance on IT infrastructure, security, and scalability tailored to enhance your business’s digital transformation.",
          color: "#8945F8",
        },
        {
          title: "Full Stack Development.",
          subtitle:
            "Deliver end-to-end full-stack development services using modern technologies like React, Node.js, and MongoDB for powerful web applications..",
          color: "#8945F8",
        },
        {
          title: "Web API",
          subtitle:
            "Develop robust and scalable APIs for seamless integration, data management, and communication across your applications.",
          color: "#2952E3",
        },
      ],
    },
    {
      title: "Blockchain Services",
      des: " I offer a comprehensive range of blockchain solutions tailored to meet your business needs. From smart contract development and auditing on Ethereum or Binance Smart Chain, to private blockchain applications using Hyperledger and R3 Corda. I also specialize in DApp development, DeFi platforms, NFT marketplace creation, and blockchain consulting for enterprise-grade implementations.",
      list: [
        {
          title: "Writing and Auditing Smart Contracts",
          subtitle:
            "Develop and audit Ethereum (Solidity) or Binance Smart Chain (BSC) smart contracts, ensuring security with tools like MythX and OpenZeppelin.",
          color: "#8945F8",
        },
        {
          title: "Blockchain Consulting",
          subtitle:
            "Expert consulting on blockchain architecture, including Hyperledger, Ethereum, and Quorum, helping businesses implement projects like supply chain tracking.",
          color: "#2952E3",
        },
        {
          title: "Private Blockchain Application",
          subtitle:
            "Custom-built private blockchain networks using Hyperledger Fabric or R3 Corda for secure, scalable enterprise-grade applications like trade finance.",
          color: "#F84550",
        },
        {
          title: "Blockchain DApp",
          subtitle:
            "Develop decentralized applications on Ethereum or Polkadot, integrating with Web3.js, Metamask, and IPFS for seamless user experiences.",
          color: "#8945F8",
        },
        {
          title: "NFT Marketplace Development",
          subtitle:
            "Build NFT platforms using Ethereum, Polygon, and Flow, integrating ERC721/1155 standards, IPFS storage, and smart contract auction mechanisms like OpenSea.",
          color: "#2952E3",
        },
        {
          title: "DeFi (Decentralized Finance) Solutions",
          subtitle:
            "Create DeFi platforms with Uniswap-like AMMs, yield farming, and staking on Ethereum, Binance Smart Chain, or Solana for seamless financial services.",
          color: "#F84550",
        },
      ],
    },
  ],
  logos: [
    {
      title: "Ethereum",
      logo: (
        <FaEthereum fontSize={60} className="text-[#c8c8c8] mx-auto py-2" />
      ),
      customStyle: "text-[#c8c8c8]",
    },
    {
      title: "Hyperledger Fabric",
      logo: (
        <img
          src={fabricLogo}
          className="text-[#c8c8c8] h-[60px] mx-auto py-2"
          alt="Hyperledger Fabric"
        />
      ),
      customStyle: "text-[#c8c8c8]",
    },
    {
      title: "Solana",
      logo: (
        <TbCurrencySolana
          fontSize={60}
          className="text-[#c8c8c8] mx-auto py-2"
        />
      ),
      customStyle: "text-[#c8c8c8]",
    },
    {
      title: "Solidity",
      logo: (
        <SiSolidity fontSize={60} className="text-[#c8c8c8] mx-auto py-2" />
      ),
      customStyle: "text-[#c8c8c8]",
    },
    {
      title: "Hard Hat",
      logo: (
        <svg
          className="mx-auto py-2"
          width="60"
          height="60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFF100"
            d="M50.782 31.593v-2.42c0-.45-.757-.88-2.116-1.266l.033-3.014c0-4.641-1.44-9.17-4.126-12.975a22.825 22.825 0 0 0-10.886-8.29l-.097-.604a1.722 1.722 0 0 0-.408-.872 1.747 1.747 0 0 0-.815-.521 23.147 23.147 0 0 0-12.925 0c-.317.093-.6.273-.818.52-.217.246-.36.548-.41.872l-.093.563A22.83 22.83 0 0 0 7.159 11.87 22.498 22.498 0 0 0 3 24.892v3.027c-1.34.385-2.087.81-2.087 1.256v2.421a.59.59 0 0 0 .087.408 5.852 5.852 0 0 1 2.247-1.015c2.072-.5 4.179-.85 6.303-1.046A4.25 4.25 0 0 1 12.857 31a8.95 8.95 0 0 0 6.009 2.313H32.83a8.943 8.943 0 0 0 6.008-2.314 4.253 4.253 0 0 1 3.308-1.069c2.123.195 4.23.543 6.302 1.042.77.146 1.498.462 2.13.924.035.035.078.066.108.1a.6.6 0 0 0 .096-.403Z"
          />
          <path
            d="M12.89 26.498a53.052 53.052 0 0 1-.03-1.673c.007-8.416 1.992-15.964 5.262-21.235A22.83 22.83 0 0 0 7.16 11.872 22.498 22.498 0 0 0 3 24.892v3.027a55.919 55.919 0 0 1 9.89-1.42Z"
            fill="url(#a)"
          />
          <path
            d="M25.846 7.818 20.5 16.841l5.346 3.288V7.818Z"
            fill="#0A0A0A"
          />
          <path
            d="M25.848 7.822v12.305l5.345-3.284-5.345-9.021ZM25.848 21.915v4.29c.1-.142 5.345-7.58 5.345-7.583l-5.345 3.293Z"
            fill="#4B4D4D"
          />
          <path
            d="m25.848 21.916-5.346-3.288 5.346 7.58v-4.294.002Z"
            fill="#0A0A0A"
          />
        </svg>
      ),
      customStyle: "text-[#c8c8c8]",
    },
    {
      title: "Meta Mask",
      logo: (
        <img
          src={metamaskLogo}
          className="text-[#c8c8c8] h-[60px] mx-auto py-2"
          alt="MetaMask"
        />
      ),
      customStyle: "text-[#c8c8c8]",
    },
    {
      title: "IPFS",
      logo: <SiIpfs fontSize={60} className="text-[#c8c8c8] mx-auto py-2" />,
      customStyle: "text-[#c8c8c8]",
    },
    {
      title: "Ether Js",
      logo: (
        <svg
          className="mx-auto py-2"
          version="1.1"
          id="Layer_1"
          width="60"
          height="60"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 100 58"
          style={{ enableBackground: "new 0 0 100 58" }}
        >
          <style type="text/css">
            {`.st0{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}`}
          </style>
          <path
            width="60"
            height="60"
            className="st0"
            d="M94.45,47.18c-42.62,5.57-73.04,12.26-73.49-15.2c0,0,0.93-10.64,13.98-11.31c0,0,0.44-9.45,10.41-10.52  c5.36-0.58,11.45,4.94,12.11,10.75c0,0,13.19-2.44,13.76,10.42c0.2,4.48-0.81,12.1-13.53,11.77c0,0-7.36-1-8.36-12.38  c-2.07,22.03,29.78,20.75,30.24,0.74c0.2-8.65-5.34-17.55-17.82-15.88C54.91-1.64,36.7-0.65,29.92,15.31  c-9.69,0-17.1,7.46-16.99,17.2C13.3,63.86,56.93,54.41,94.45,47.18z"
          />
        </svg>
      ),
      customStyle: "text-[#c8c8c8]",
    },
    {
      title: "NodeJs",
      logo: <FaNodeJs fontSize={60} className="text-[#c8c8c8] mx-auto py-2" />,
      customStyle: "text-[#c8c8c8]",
    },
    {
      title: "ReactJS",
      logo: <FaReact fontSize={60} className="text-[#c8c8c8] mx-auto py-2" />,
      customStyle: "text-[#c8c8c8]",
    },
    {
      title: "PHP",
      logo: <FaPhp fontSize={60} className="text-white mx-auto py-2" />,
      customStyle: "text-[#c8c8c8]",
    },
    {
      title: "TailwindCSS",
      logo: <SiTailwindcss fontSize={60} className="text-white mx-auto py-2" />,
      customStyle: "text-[#c8c8c8]",
    },
    {
      title: "MySql",
      logo: <SiMysql fontSize={60} className="text-[#c8c8c8] mx-auto py-2" />,
      customStyle: "text-[#c8c8c8]",
    },
    {
      title: "MongoDb",
      logo: <SiMongodb fontSize={60} className="text-[#c8c8c8] mx-auto py-2" />,
      customStyle: "text-[#c8c8c8]",
    },
    {
      title: "Docker",
      logo: <FaDocker fontSize={60} className="text-[#c8c8c8] mx-auto py-2" />,
      customStyle: "text-[#c8c8c8]",
    },
    {
      title: "AWS",
      logo: <FaAws fontSize={60} className="text-white mx-auto py-2" />,
      customStyle: "text-[#c8c8c8]",
    },
  ],
  projectPage: {
    title: "Feature Projects",
    description: ` Here are some of my featured projects that showcase my expertise in full-stack and blockchain development. Each project highlights my ability to deliver innovative solutions, from decentralized applications to scalable web platforms, demonstrating my commitment to excellence and cutting-edge technology.`,

    projects: [
      {
        id: 1,
        category: "Web App",
        title: "MuslimBD — Shariah-Based Digital Ecosystem for Muslims",
        description: `MuslimBD provides a trusted, faith-driven platform with a live Muslim API today and more Islamic tools coming soon for prayer times, Quran, mosque discovery, dhikr tracking, and developer-first products that support a Shariah-based lifestyle.
          <br/>
          - Quran verse by verse in multiple languages audio <br/>
          - Prayer times <br/>
          - API rate limiting <br/> 
          `,
        image: Muslimbd,
        link: "https://www.muslimbd.app/",
        links: [
          {
            title: "API",
            url: "https://api.muslimbd.app/",
          },

          {
            title: "Documentation",
            url: "https://api-documentation.muslimbd.app/",
          },
        ],
        tools:
          "Express.js, Next.js , GraphQL, MongoDB, Redis, Azure TTS, Docker, Clud computing",
      },

      {
        id: 2,
        category: "DeFi",
        title: "Palm USD - The Digital Dollar Built for the Globe",
        description: ` The global digital dollar. Fully-reserved stablecoin infrastructure backed 1:1 by AED and SAR reserves held in Shariah-compliant instruments at regulated GCC custodians..
          <br/>
          - $2.8B  in circulation <br/>
          - 1:1 mint & redeem against AED, SAR, USD <br/>
          - Deployed on 4 Tesntnets <br/> 
          `,
        image: PalmUsd,
        link: "https://www.palmusd.com/",
        links: [
          {
            title: "Swap",
            url: "https://getuntethered.xyz/",
          },
          {
            title: "Trade",
            url: "https://www.biconomy.com/exchange/PUSD_USDT",
          },
          {
            title: "Documentation",
            url: "https://www.palmusd.com/pages/developers.html",
          },
        ],
        tools: "Solidity, Rust, Express.js, Next.js , GraphQL, MongoDB ",
      },
      {
        id: 3,
        category: "DeFi",
        title: "NexUSD - Next-Generation USD Stablecoin",
        description: ` NEX-USD is a next-generation decentralized USD infrastructure deployed across 10 EVM-compatible test networks. The project focuses on multi-chain scalability, smart contract deployment, and seamless Web3 integration, enabling cross-chain testing, interoperability, and stable digital asset experimentation within a modern blockchain ecosystem.
          <br/>
          - Trading Bot <br/>
          - Deployed on 10 Tesntnets <br/>
          - Custom Wallet <br/> 
          - Faucet <br/> 
          `,
        image: NexUsd,
        link: "https://nex-usd.vercel.app",
        links: [
          {
            title: "Wallet",
            url: "https://wallet-nex-usd.vercel.app",
          },
          {
            title: "Bot",
            url: "https://self-transaction-nex-usd-bot.vercel.app",
          },
        ],
        tools:
          "Solidity, Express.js, Next.js ,  GraphQL ,  MongoDB, Redis, Docker, Cloud computing",
      },
      {
        id: 4,
        category: "Web App",
        title: "Beejoyi | Showcase Your Talent & Win Big!",
        description:
          " A full-featured Web2 application built with Material UI, Next.js, GraphQL, MongoDB, Redux, and more. The platform supports server-side rendering, real-time data updates, and a responsive UI. Features include authentication, user profiles, dashboards, and advanced search.",
        image: Beejoyi,
        link: "https://beejoyi.com/",
        tools:
          "Next.js ,  GraphQL ,  MongoDB,  Redux,  Material UI,  Node.js,  JWT Auth",
      },
      {
        id: 5,
        category: "DeFi",
        title: "Lottaverse: A New Era of Blockchain Lottery.",
        description:
          "Developed Lottavarse, a blockchain-based lottery application on Polygon, leveraging Chainlink VRF for fair winner selection. Features include diverse lottery types, multi-winner formats, premium user commissions, uni-level referrals, bonuses for top leaders and buyers, and reward-based purchases with commission withdrawal options.",
        image: Lottaverse,
        link: "https://lottaverse-v2-0.vercel.app/",
        tools:
          "Polygon, Chainlink, Solidity, NextJs, Ethers, Wagmi, Infura, Foundry, MetaMask",
      },
      {
        id: 6,
        category: "NFT",
        title: "Billy The Blue Whale NFT Collection.",
        description:
          "Developed Lottavarse, a blockchain-based lottery application on Polygon, leveraging Chainlink VRF for fair winner selection. Features include diverse lottery types, multi-winner formats, premium user commissions, uni-level referrals, bonuses for top leaders and buyers, and reward-based purchases with commission withdrawal options.",
        image: Billy,
        link: "https://www.bluewhalenft.com",
        tools:
          "Blockchain, NFT, Solana, Next.js, Magic Eden, Smart Contract, Web3.js, MetaMask",
      },
      {
        id: 7,
        category: "Blockchain",
        title:
          "SecureDoc: AI-Powered Blockchain-Based Certificate Authentication",
        description:
          "SecureDoc is a government-funded, AI-powered blockchain solution on Ethereum for secure academic certificate authentication. The platform includes an admin application to manage university subscriptions and tokens, supporting institutional control. Universities use a dedicated dApp to handle student data, including options to disqualify or reissue certificates, while students benefit from a privacy-focused dApp for secure, accessible document management. A verifier application provides an efficient, trustworthy way for authorized parties to validate and view certificates. Designed for scalability and privacy, SecureDoc ensures academic credentials are authentic and accessible while offering robust privacy and secure verification, revolutionizing document authentication standards.",
        image: SecureDoc,
        link: "",
        tools:
          "AI, Ethereum, Smart Contract, ReactJs, Ethers, HardHat, Alchemy MetaMssk",
      },
      // {
      //   id: 5,
      //   title: "Blockchain Drive: Securing Data on the Ethereum & IPFS",
      //   description:
      //     "Blockchain Drive is a data security solution on Ethereum and IPFS, enabling file uploads via IPFS (Pinata) with Ethereum-backed storage links. It integrates with MetaMask for seamless access, allowing users to share or revoke file access through secure blockchain-based controls.",
      //   image: Drive,
      //   link: "http://blockchain-drive.ruhul.info/",
      //   tools:
      //     "Ethereum, Smart Contract, ReactJs, Ethers, Tailwind CSS, MetaMask",
      // },
    ],
  },
  jobPage: {
    title: "Development Experience",
    description: `I’m a Full Stack Developer with 6+ years of web development
            experience and 3+ years of blockchain engineering. I build end-to-end
            web applications with modern frontends, APIs, and backend services,
            while also designing secure smart contracts and Web3 integrations.
            My work spans public and private blockchains like Ethereum and
            Hyperledger Fabric, as well as full-stack projects using Node.js and
            React.js.  <br />
            <br />
            - Full Stack Web Development – APIs, frontend interfaces, and cloud
            deployments
            <br />
            - Blockchain & Smart Contracts – Secure Solidity contracts and DApp
            architecture
            <br />
            - Web3 Integration – Wallet, Ethers.js, and blockchain-based UX
            workflows
            <br />- Product Delivery – Scalable solutions that combine web and
            blockchain technology`,

    jobList: [
      {
        title: "Jan 2022 - Current",
        cardTitle: "Freelance Full-Stack & Blockchain Developer",
        // url: "http://www.history.com",
        cardDetailedText: [
          "Experienced full-stack  developer building scalable Next.js frontends, Express APIs, GraphQL services, database integrations, and cloud-native deployments with optimized performance, security, modern developer workflows across teams and products securely globally.",

          "Focus on developing secure, gas-efficient Solidity smart contracts, integrating DApps seamlessly with Ethers.js and Hardhat, and building DeFi and NFT platforms, including yield farming and staking. I also ensure contract security through thorough auditing and adherence to best practices.",

          "Skills : Express.js, Next.js, GraphQl, DeFi, DApp, Smart Contract, Token, Nft, ChainLink, Foundry, Redis, MongoDB, GraphQL, Docker, Cloud computing",
        ],

        media: {
          type: "IMAGE",
          source: {
            url: freelanceImg,
          },
        },
      },
      {
        title: "Sep 2025 - March 2026",
        cardTitle: "Senior Blockchain Developer (Remote)",
        cardSubtitle: "Harborview ",
        url: "https://harborview.ae/",
        cardDetailedText: [
          "Built secure smart contracts for PALM USD across EVM, Tron, and Solana using Solidity and Rust with LayerZero cross-chain integration. Developed the backend in Express.js and frontend in Next.js, added a Python trading bot, authored documentation, created comprehensive Foundry test cases, and delivered production-ready blockchain application workflows with deployment support.",
          "skills: Solidity, Rust, Express.js, Next.js , GraphQL, LayerZero. ",
        ],

        media: {
          type: "IMAGE",
          source: {
            url: harborviewImg,
          },
        },
      },

      {
        title: "Oct 2024 - Aug 2025",
        cardTitle: "Blockchain Developer (Remote)",
        cardSubtitle: "BASEMENT SPORTS",
        url: "#",
        cardDetailedText: [
          "Improved liquidity with a Solana bot that boosted trading to $200K and expanded Polygon NFT adoption.",
          "Built Stripe and IAP integrations for mobile minting of 64K NFTs, plus Solana and Polygon smart contract deployment.",
          "Delivered a Next.js full-stack DApp with secure wallet integration, responsive UI, and scalable blockchain architecture.",

          "skills: Solana, Polygon, Solidity, Rust (Solana programs), Next.js, Stripe Integration, IAP, Smart Contract Deployment, NFT Development, Web3.js, Ethers.js, Wallet Integration, Blockchain Architecture",
        ],

        media: {
          type: "IMAGE",
          source: {
            url: basementsportsImg,
          },
        },
      },
      {
        title: "Oct 2023 - Dec 2023",
        cardTitle: "Blockchain Developer",
        cardSubtitle: "AAK TELE-SCIENCE, INC",
        url: "https://aakscience.com/",
        cardDetailedText: [
          "Specialize in Smart Contract Development, creating secure and gas-efficient Solidity contracts, and DApp Development, ensuring seamless Web3 integration using Ethers.js and Hardhat for optimal performance and functionality.",
          "Skills : DApp, Ethereum, Blockchain, Smart Contract, ERC Tokens, Node.js, React.js, TypeScript, Ether.js, Foundry",
        ],
        media: {
          type: "IMAGE",
          source: {
            url: aakImg,
          },
        },
      },
      {
        title: "NOV 2017 - DEC 2022",
        cardTitle: "Software Engineer",
        cardSubtitle: "ABASAS TECHNOLOGIES INC.",
        url: "#",
        cardDetailedText: [
          "Designed and developed REST APIs using Laravel and Express, managed deployments with Docker and AWS, and created specifications for web applications. I also developed front-end features using HTML, CSS, Sass, EJS, and React, while mentoring intern engineers.",
          "Skills : Leadership, Technical Documentation, Devops, Project Management, PHP, Express, React, Docker, AWS, HTML, CSS, Sass, EJS, Laravel, Foundry",
        ],
        media: {
          type: "IMAGE",
          source: {
            url: abasasImg,
          },
        },
      },
    ],
  },
};
