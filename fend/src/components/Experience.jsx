import React from "react";
import { Chrono } from "react-chrono";
import abasasImg from "../../images/abasas.png";
import aakImg from "../../images/aak.png";
import bcImg from "../../images/bc.png";





const jobList = [


    {
        title: "Jan 2024 - Current",
        cardTitle: "Freelance Blockchain Developer",
        url: "http://www.history.com",
        cardDetailedText: [
            "Focus on developing secure, gas-efficient Solidity smart contracts, integrating DApps seamlessly with Ethers.js and Hardhat, and building DeFi and NFT platforms, including yield farming and staking. I also ensure contract security through thorough auditing and adherence to best practices.",
            "Skills : DeFi, DApp, Smart Contract, Smart Contract Security, Token, Nft, ChainLink, Express.js, Next.js, Foundry"
        ],

        media: {
            type: "IMAGE",
            source: {
                url: bcImg

            }
        }
    },
    {
        title: "Oct 2023 - Dec 2023",
        cardTitle: "Blockchain Developer",
        cardSubtitle: "AAK TELE-SCIENCE, INC",
        url: "http://www.history.com",
        cardDetailedText: [
            "Specialize in Smart Contract Development, creating secure and gas-efficient Solidity contracts, and DApp Development, ensuring seamless Web3 integration using Ethers.js and Hardhat for optimal performance and functionality.",
            "Skills : DApp, Ethereum, Blockchain, Smart Contract, ERC Tokens, Node.js, React.js, TypeScript, Ether.js, Foundry",
        ],
        media: {
            type: "IMAGE",
            source: {
                url: aakImg
            }
        }
    },
    {
        title: "NOV 2017 - DEC 2022",
        cardTitle: "Software Engineer",
        cardSubtitle: "ABASAS TECHNOLOGIES INC.",
        url: "#",
        cardDetailedText:[ 
            "Designed and developed REST APIs using Laravel and Express, managed deployments with Docker and AWS, and created specifications for web applications. I also developed front-end features using HTML, CSS, Sass, EJS, and React, while mentoring intern engineers.",
            "Skills : Leadership, Technical Documentation, Devops, Project Management, PHP, Express, React, Docker, AWS, HTML, CSS, Sass, EJS, Laravel, Foundry",

        ],
        media: {
            type: "IMAGE",
            source: {
                url: abasasImg
            }
        }
    },

];



const Experience = () => (
    <>




        <div id="Publications" className="flex w-full justify-center items-center gradient-bg-welcome  " >
            <div className="flex  flex-col  items-center justify-between md:p-20 py-12 px-4">

                <div className="flex flex-col justify-start items-center    py-12 w-3/4">
                    <h1 className=" uppercase font-bold  text-3xl sm:text-5xl py-2 text-primary-color  ">
                        Development Experience
                        <br />
                    </h1>
                    <p className="text-center my-2 text-white font-light md:w-9/12 w-11/12 text-base ">
                        I’m a Full Stack Blockchain Developer and Researcher with 5+ years of experience in web development and 2+ years of experience in blockchain development. I have developed blockchain projects, smart contract libraries, and published over 10 research papers on various blockchain topics. My expertise includes writing smart contracts for public blockchains like Ethereum and private blockchains like Hyperledger Fabric, as well as developing full stack blockchain applications using Node.js and React.js.
                        <br />

                        <br />
                        - Smart Contract Development – Secure & gas-optimized Solidity contracts
                        <br />
                        - DApp Development – Seamless Web3 integration with Ethers.js & Hardhat
                        <br />
                        - DeFi & NFTs – Yield farming, staking, tokenomics, and NFT platforms
                        <br />
                        - Security & Auditing – Writing robust, bug-free contracts with best practices
                    </p>
                </div>

                <div className=" flex flex-col justify-start items-start w-full">
                    <div className="  w-full">
                        {/* <div style={{ width: "500px", height: "400px" }}> */}
                        <Chrono items={jobList}
                            mode="VERTICAL_ALTERNATING"
                            cardHeight="200"
                            contentDetailsHeight="100"
                            disableInteraction={true}
                            disableClickOnCircle={true}
                            disableNavOnKey={true}
                            enableBreakPoint={true}
                            enableQuickJump={false}
                            disableToolbar={true}
                            classNames={{
                                card: 'my-card',
                                cardMedia: 'my-card-media',
                                cardSubTitle: 'my-card-subtitle',
                                cardText: 'my-card-text',
                                cardTitle: 'my-card-title',
                                controls: 'my-controls',
                                title: 'my-title',
                            }}



                        />
                    </div>

                </div>
            </div>
        </div>
    </>
);

export default Experience;
