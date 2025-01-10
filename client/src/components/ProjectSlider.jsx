// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation'; 
// // import 'swiper/scss/pagination';
// // import { Navigation } from 'swiper';

import React, { useState } from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiExternalLinkFill, RiHeart2Fill } from "react-icons/ri";
import Logos from "./Logos";

import demo from "../../images/demo.png";
import Lottaverse from "../../images/project/lottaverse.png";
import SecureDoc from "../../images/project/securedoc.png";
import Billy from "../../images/project/billy.png";
import Drive from "../../images/project/drive.png";

import { Controller } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';

// Import Swiper styles

const projects = [
  {
    id: 1,
    title: 'Lottaverse: A New Era of Blockchain Lottery.',
    description: 'Developed Lottavarse, a blockchain-based lottery application on Polygon, leveraging Chainlink VRF for fair winner selection. Features include diverse lottery types, multi-winner formats, premium user commissions, uni-level referrals, bonuses for top leaders and buyers, and reward-based purchases with commission withdrawal options.' ,
    image: Lottaverse,
    link: 'https://app.lottaverse.io/',
    tools:"Polygon, Chainlink, Solidity, NextJs, Ethers, Wagmi, Infura, Foundry, MetaMask"
  },  {
    id: 2,
    title: 'Billy The Blue Whale NFT Collection.',
    description: 'Developed Lottavarse, a blockchain-based lottery application on Polygon, leveraging Chainlink VRF for fair winner selection. Features include diverse lottery types, multi-winner formats, premium user commissions, uni-level referrals, bonuses for top leaders and buyers, and reward-based purchases with commission withdrawal options.' ,
    image: Billy,
    link: 'https://www.bluewhalenft.com',
    tools:"Polygon, Chainlink, Solidity, NextJs, Ethers, Wagmi, Infura, Foundry, MetaMask"
  },  {
    id: 3,
    title: 'SecureDoc: AI-Powered Blockchain-Based Certificate Authentication',
    description: 'SecureDoc is a government-funded, AI-powered blockchain solution on Ethereum for secure academic certificate authentication. The platform includes an admin application to manage university subscriptions and tokens, supporting institutional control. Universities use a dedicated dApp to handle student data, including options to disqualify or reissue certificates, while students benefit from a privacy-focused dApp for secure, accessible document management. A verifier application provides an efficient, trustworthy way for authorized parties to validate and view certificates. Designed for scalability and privacy, SecureDoc ensures academic credentials are authentic and accessible while offering robust privacy and secure verification, revolutionizing document authentication standards.' ,
    image: SecureDoc,
    link: 'https://secure-doc.ruhul.info/',
    tools:"AI, Ethereum, Smart Contract, ReactJs, Ethers, HardHat, Alchemy MetaMssk"
  },  {
    id: 4,
    title: 'Blockchain Drive: Securing Data on the Ethereum & IPFS',
    description: 'Blockchain Drive is a data security solution on Ethereum and IPFS, enabling file uploads via IPFS (Pinata) with Ethereum-backed storage links. It integrates with MetaMask for seamless access, allowing users to share or revoke file access through secure blockchain-based controls.' ,
    image: Drive,
    link: 'http://blockchain-drive.ruhul.info/',
    tools:"Ethereum, Smart Contract, ReactJs, Ethers, Tailwind CSS, MetaMask"
    
  },
 
];









export default () => {
 
 

  return (
    <div className="w-full">



      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        rewind={true}
        modules={[Navigation,Pagination]}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)} 
        className="mySwiper"

      >



        {projects.map((project) => (
          <SwiperSlide>

            <div id="services" className="flex w-full justify-center items-center  ">
              <div className="flex  flex-col-reverse md:flex-row   items-center justify-between md:p-20 py-4 px-4 ">
                <div className="   flex-1  justify-start items-start  text-left  ">
            
                  <div class="text-8xl leading-none font-extrabold   text-transparent text-outline mt-10 mb-2  outlineText  "   >0{project.id}</div>
                  <h1 className="   font-bold text-xl sm:text-xl py-2 text-primary-color  titleCase   ">
                    {project.title} 
                  </h1>
                  <p className="text-left my-2 text-white font-light w-full text-base pr-2 md:pr-6 text-justify">
                    {project.description}
                  </p>

                    <div className="text-primary-color  font-bold text-left py-2" >
                      {project.tools}
                    </div>

                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary-color ">
                    <div className="flex gap-2">

                     Live Link   <RiExternalLinkFill className="h-[25px]" />
                    </div>
                    
                      </a>
                </div>

                <div className=" flex-1  justify-end items-center   ">


                  <img src={project.image} alt={project.title} className="w-full   object-cover rounded-md shadow-3xl   " />

                </div>
              </div>
            </div>

          </SwiperSlide>))}

      </Swiper>
    </div>
  );
}



