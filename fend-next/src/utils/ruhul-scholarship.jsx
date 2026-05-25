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
import Beejoyi from "../../images/project/beejoyi.png";

import abasasImg from "../../images/abasas.png";
import aakImg from "../../images/aak.png";
import bcImg from "../../images/bc.png";

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

import { SiIpfs } from "react-icons/si";

import fabricLogo from "../../images/hlf2.png";
import metamaskLogo from "../../images/metamask.png";

export const configRuhulScholarship = {
  settings: {
    logos: false,
    services: false,
    projects: false,
    research: true,
    reviewing: true,
    experience: true,
    researchArea: true,
  },
  title: "Ruhul Amin - Researcher & Scholar",
  name: "Ruhul Amin",
  researchPage: {
    title: "Publications",
    interest: [
      "Blockchain Technology",
      "Artificial Intelligence",
      "Data Science",
      "Web Development",
      "Cloud Computing",
    ],
    description:
      "I've published papers on transparent and collaborative hiring systems, a reputation-based interoperable drug supply system, and various topics including crime report management, online classroom, drop-shipping systems.",
    reviewing: [
      {
        title:
          "2nd International Conference on Artificial Intelligence: Theory and Applications (AITA 2024)",
        year: "2024",
      },
      {
        title:
          "3rd 2024 IEEE World Conference on Applied Intelligence and Computing (AIC 2024)",
        year: "2024",
      },
      {
        title:
          "5th International Conference on Data Science and Applications (ICDSA 2024)",
        year: "2024",
      },
      {
        title: "4th International Conference on Computer Vision and Robotics",
        year: "2024",
      },
      {
        title:
          "5th International Conference on Data Science and Applications (ICDSA 2024)",
        year: "2024",
      },
      {
        title:
          "4th International Conference on Paradigms of Communication, Computing and Data Analytics (PCCDA 2024)",
        year: "2024",
      },
      {
        title:
          "International Conference on Business Intelligence and Data Analytics (BIDA 2024)",
        year: "2024",
      },
      {
        title:
          "5th World Conference on Artificial Intelligence: Advances and Applications (WCAIAA 2024)",
        year: "2024",
      },
      {
        title: "2023 IEEE Pune Section International Conference",
        year: "2023",
      },
      {
        title:
          "2024 IEEE International Conference on Contemporary Computing and Communications (InC4)",
        year: "2024",
      },
      {
        title:
          "IEEE ICBDS 2023 | IEEE International Conference on Blockchain and Distributed Systems Security 2023",
        year: "2023",
      },
      {
        title:
          "AIBThings-2023 | The IEEE International Conference on Artificial Intelligence, Blockchain, and Internet of Things",
        year: "2023",
      },
    ],
    publicationList: [
      {
        title:
          "Blockchain-based Integrated Application for Forged Elimination of Hiring System using Hyperledger Fabric 2.x.",
        description:
          "2022 25th International Conference on Computer and Information Technology (ICCIT), Cox's Bazar, Bangladesh, 2022, pp. 1057-1062, doi:10.1109/ICCIT57492.2022.10055308.",
        authors:
          "<b>R. Amin</b>, M. S. Islam, R. I. Arif, A. Islam and M. M. Hossain",
        link: {
          IEEE: "https://ieeexplore.ieee.org/document/10055308",
          Scholar: "#",
          ResearchGate: "#",
        },
        isAward: true,
      },
      {
        title:
          "HIREX: A Heterogeneous Interoperable Blockchain Solution For Hiring System.",
        description:
          "2023 3rd International Conference on Intelligent Communication and Computational Techniques (ICCT), Jaipur, India, 2023, pp. 1-7, doi:10.1109/ICCT56969.2023.10076241.",
        authors: "<b>R. Amin</b>, A. Islam, D. H. Tanvir and R. I. Arif",
        link: {
          IEEE: "https://ieeexplore.ieee.org/abstract/document/10076241",
          Scholar: "#",
          ResearchGate: "#",
        },
        isAward: false,
      },
      {
        title:
          "SafetyNet: A Decentralized Police Complaint Management System For Bangladesh Using Blockchain.",
        description:
          "International Conference on Advances in Computing, Communication, Electrical and Smart Systems DOI:10.1109/CACCESS61735.2024.10499556",
        authors:
          "T. Ahmed, S. D. Chowdhury, <b>R. Amin</b>, R. A. Chowdhury, S. M. Tanjim, M. Lysuzzaman",
        link: {
          IEEE: "https://ieeexplore.ieee.org/document/10499556",
          Scholar: "#",
          ResearchGate: "#",
        },
        isAward: true,
      },
      {
        title:
          "Blockchain Interoperability For A Reputation-Based Drug Supply Chain Management.",
        description:
          "2023 6th International Conference on Information Systems and Computer Networks (ISCON) (pp. 1-6). IEEE , doi: 10.1109/ISCON57294.2023.10112196",
        authors:
          "H. Tanvir, <b>R. Amin</b>, A. Islam, M. S. Islam, M. M. Rashid",
        link: {
          IEEE: "https://doi.org/10.1109/ISCON57294.2023.10112196",
          Scholar: "#",
          ResearchGate: "#",
        },
        isAward: false,
      },
      {
        title:
          "xCRM: Blockchain Interoperable Crime Report Management System By Utilizing Hyperledger Cacti & Private Data Collection (PDC).",
        description:
          "2023 International Conference on Next-Generation Computing, IoT and Machine Learning (NCIM), Gazipur, Bangladesh, 2023, pp. 1-6, doi: 10.1109/NCIM59001.2023.10212677.",
        authors:
          "<b>R. Amin</b>, R. A. Chowdhury, S. M. Tanjim, A. Islam and M. S. Islam",
        link: {
          IEEE: "https://doi.org/10.1109/NCIM59001.2023.10212677",
          Scholar: "#",
          ResearchGate: "#",
        },
        isAward: false,
      },
      {
        title:
          "Multi-Layer Open-Domain Bangla Conversational Chatbot with a Hybrid approach.",
        description:
          "2023 International Conference on Next-Generation Computing, IoT and Machine Learning (NCIM), Gazipur, Bangladesh, 2023, pp. 1-6, doi: 10.1109/NCIM59001.2023.10212816",
        authors: "P. H. Saurav, A. R. Limon, <b>R. Amin</b> and M. Rahman",
        link: {
          IEEE: "https://doi.org/10.1109/NCIM59001.2023.10212816",
          Scholar: "#",
          ResearchGate: "#",
        },
        isAward: false,
      },
      {
        title:
          "B-Dropshipper: Revolutionizing Dropshipping with Federal Blockchain Solutions.",
        description:
          "2023 26th International Conference on Computer and Information Technology (ICCIT), Cox's Bazar, Bangladesh, 2023, pp. 1-6, doi: 10.1109/ICCIT60459.2023.10441335.",
        authors:
          "<b>R. Amin</b>, M.H. Shakil, O. Talukder, S.S. Ankhi, A. Islam and Rabbi, M. F",
        link: {
          IEEE: "https://ieeexplore.ieee.org/document/10441335",
          Scholar: "#",
          ResearchGate: "#",
        },
        isAward: false,
      },
      {
        title:
          "S-DrivingRecords: Blockchain-based Enhancing Trust and Transparency in Driving Records Using Hyperledger Fabric.",
        description:
          "International Conference on Advances in Computing, Communication, Electrical and Smart Systems. DOI: 10.1109/iCACCESS61735.2024.10499543",
        authors:
          "R. A. Chowdhury, S. M. Tanjim, <b>R. Amin</b>, T. Ahmed, S. D. Chowdhury, M. Lysuzzaman",
        link: {
          IEEE: "https://ieeexplore.ieee.org/abstract/document/10499543",
          Scholar: "#",
          ResearchGate: "#",
        },
        isAward: false,
      },

      {
        title:
          "B-ClassRoom: Blockchain-based distance learning with resource sharing using Hyperledger Fabric Private Data Collection (PDC).",
        description: "World Congress on Smart Computing (WCSC2024)",
        authors:
          "<b>R. Amin</b>, T. Ahmed, S. Chowdhury, A. Islam and Rabbi, M. F.",
        link: {
          IEEE: "#",
          Scholar: "#",
          ResearchGate: "#",
        },
        isAward: false,
      },
    ],
  },

  socialLinks: {
    linkedin: {
      link: "https://www.linkedin.com/in/theruhulamin/",
      title: "LinkedIn",
      Icon: RiLinkedinFill,
      color: "#2952E3",
      text: "linkedin.com/in/theruhulamin",
    },

    googleScholar: {
      link: "https://scholar.google.com/citations?user=pW39RGYAAAAJ&hl",
      title: "Google Scholar",
      text: "RuhulAmin",
      Icon: FaGoogleScholar,
      color: "#1877F3",
    },
    researchGate: {
      link: "https://www.researchgate.net/profile/Ruhul-Amin-95",
      title: "ResearchGate",
      text: "Ruhul-Amin-95",
      Icon: FaResearchgate,
      color: "#EA4335",
    },

    email: {
      link: "mailto:ruhulamin010398@gmail.com",
      title: "Email",
      text: "ruhulamin010398@gmail.com",
      Icon: RiMailFill,
      color: "#2952E3",
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
    tagLine:
      "Working as Research Assistant at Shahjalal University of Science and Technology.",
    overViewList: [
      {
        title: "Teacher",
        description: "2+ year Experience in University teaching.",
        icon: <GiTeacher fontSize={21} className="text-white" />,
        color: "bg-[#F84550]",
      },

      {
        title: "Research Interest",
        description:
          "Blockchain Technology <br/>  AI, IoT, Network Security.  ",
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
        {
          title: "WordPress Website",
          subtitle:
            "Create custom WordPress websites tailored to your brand, with optimized performance, SEO, and a user-friendly interface.",
          color: "#F84550",
        },
        {
          title: "Shopify Store",
          subtitle:
            "Launch and scale your Shopify store with custom themes, integrations, and optimizations to enhance the customer shopping experience.",
          color: "#2952E3",
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
    description: `Explore a selection of my standout projects as a Full Stack
              Blockchain Developer and Researcher. With expertise in DApps,
              DeFi, NFTs, and private blockchain solutions, I have built secure
              systems, smart contracts, and full-stack applications using
              technologies like Ethereum, Hyperledger Fabric, Node.js, and
              Next.js. These projects reflect my commitment to creating
              innovative, scalable solutions in blockchain and web development.
              Dive in to discover how I leverage technology to address
              real-world challenges.`,

    projects: [
      {
        id: 1,
        title: "Lottaverse: A New Era of Blockchain Lottery.",
        description:
          "Developed Lottavarse, a blockchain-based lottery application on Polygon, leveraging Chainlink VRF for fair winner selection. Features include diverse lottery types, multi-winner formats, premium user commissions, uni-level referrals, bonuses for top leaders and buyers, and reward-based purchases with commission withdrawal options.",
        image: Lottaverse,
        link: "https://lottaverse-v2-0.vercel.app/",
        tools:
          "Polygon, Chainlink, Solidity, NextJs, Ethers, Wagmi, Infura, Foundry, MetaMask",
      },
      {
        id: 2,
        title: "Beejoyi | Showcase Your Talent & Win Big!",
        description:
          " A full-featured Web2 application built with Material UI, Next.js, GraphQL, MongoDB, Redux, and more. The platform supports server-side rendering, real-time data updates, and a responsive UI. Features include authentication, user profiles, dashboards, and advanced search.",
        image: Beejoyi,
        link: "https://app.beejoyi.io/",
        tools:
          "Next.js ,  GraphQL ,  MongoDB,  Redux,  Material UI,  Node.js,  JWT Auth",
      },
      {
        id: 3,
        title: "Billy The Blue Whale NFT Collection.",
        description:
          "Developed Lottavarse, a blockchain-based lottery application on Polygon, leveraging Chainlink VRF for fair winner selection. Features include diverse lottery types, multi-winner formats, premium user commissions, uni-level referrals, bonuses for top leaders and buyers, and reward-based purchases with commission withdrawal options.",
        image: Billy,
        link: "https://www.bluewhalenft.com",
        tools:
          "Blockchain, NFT, Solana, Next.js, Magic Eden, Smart Contract, Web3.js, MetaMask",
      },
      {
        id: 4,
        title:
          "SecureDoc: AI-Powered Blockchain-Based Certificate Authentication",
        description:
          "SecureDoc is a government-funded, AI-powered blockchain solution on Ethereum for secure academic certificate authentication. The platform includes an admin application to manage university subscriptions and tokens, supporting institutional control. Universities use a dedicated dApp to handle student data, including options to disqualify or reissue certificates, while students benefit from a privacy-focused dApp for secure, accessible document management. A verifier application provides an efficient, trustworthy way for authorized parties to validate and view certificates. Designed for scalability and privacy, SecureDoc ensures academic credentials are authentic and accessible while offering robust privacy and secure verification, revolutionizing document authentication standards.",
        image: SecureDoc,
        link: "",
        tools:
          "AI, Ethereum, Smart Contract, ReactJs, Ethers, HardHat, Alchemy MetaMssk",
      },
      {
        id: 5,
        title: "Blockchain Drive: Securing Data on the Ethereum & IPFS",
        description:
          "Blockchain Drive is a data security solution on Ethereum and IPFS, enabling file uploads via IPFS (Pinata) with Ethereum-backed storage links. It integrates with MetaMask for seamless access, allowing users to share or revoke file access through secure blockchain-based controls.",
        image: Drive,
        link: "http://blockchain-drive.ruhul.info/",
        tools:
          "Ethereum, Smart Contract, ReactJs, Ethers, Tailwind CSS, MetaMask",
      },
    ],
  },
  jobPage: {
    title: "Experience in Academia",
    description: `I am currently serving as a Research Assistant at Shahjalal University of Science & Technology , i also  worked as Lecturer at Sylhet International University, with prior experience as an Adjunct Faculty at Habiganj Agricultural University and Faridpur Engineering College. along with this, i worked at research assistant at  Sylhet Engineering College, contributing to academic and technical projects. My background combines hands-on teaching with practical involvement in academic research and institutional development.
    `,

    jobList: [
      {
        title: "Oct 2023 - current",
        cardTitle: "Research Assistant",
        cardSubtitle: "Shahjalal University of Science & Technology",
        url: "#",
        cardDetailedText: [
          "Engaged in blockchain research, specializing in interoperability mechanisms. Contributed to research papers, focusing on blockchain, IoT, and ML. Assisted in experiment planning, data analysis, and presented findings in weekly team meetings.",
        ],
      },
      {
        title: "june 2023 - june 2024",
        cardTitle: "Lecturer",
        cardSubtitle: "Sylhet International University",
        url: "https://www.siu.edu.bd/",
        cardDetailedText: [
          "Courses Taken:",
          "Machine Learning.",
          "Machine Learning Lab.",
          "Algorithms.",
          "Algorithms Lab.",
          "Discrete Mathematics.",
          "Data Structure.",
          "Data Structure Lab.",
          "Object Oriented Programming Language.",
          "Object Oriented Programming Language Lab.",
        ],
      },

      {
        title: "NOV 2017 - DEC 2022",
        cardTitle: "Adjunct Faculty",
        cardSubtitle: "Habiganj Agricultural University",
        url: "#",
        cardDetailedText: [
          "Courses Taken:",
          "Computer Applications in Fisheries",
          "Computer Applications in Fisheries Lab",
        ],
      },

      {
        title: "NOV 2017 - DEC 2022",
        cardTitle: "Research Assistant",
        cardSubtitle: "Sylhet Engineering College",
        url: "#",
        cardDetailedText: [
          "Conducted research at the interoperability of blockchain and IoT, aiding in experimental design, data analysis, and paper development, while actively collaborating with a research team and gaining proficiency in Solidity, Ethereum, and Hyperledger Fabric tools.",
        ],
      },
      {
        title: "NOV 2017 - DEC 2022",
        cardTitle: "Adjunct Faculty",
        cardSubtitle: "Faridpur Engineering College",
        url: "#",
        cardDetailedText: [
          "Courses Taken:",
          "Object Oriented Programming",
          "Software Engineering Lab",
        ],
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
      },
    ],
  },
};
