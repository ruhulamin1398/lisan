import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import Logos from "./Logos";

const ServiceCard = ({ color, title, icon, subtitle }) => (

  <div class="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div class={`w-10 h-10 rounded-full flex justify-center items-center my-auto bg-[${color}]`}>
      {icon}
    </div>
    <div class="ml-5 flex flex-col flex-1">
      <h3 class="mt-2 text-primary-color text-lg ">{title}</h3>
      <p class="mt-1 text-white text-sm md:w-full">{subtitle}</p>
    </div>
  </div>
);





const Services = () => {
  const servicesListBC = {

    title: "Blockchain Services",
    des: " I offer a comprehensive range of blockchain solutions tailored to meet your business needs. From smart contract development and auditing on Ethereum or Binance Smart Chain, to private blockchain applications using Hyperledger and R3 Corda. I also specialize in DApp development, DeFi platforms, NFT marketplace creation, and blockchain consulting for enterprise-grade implementations.",
    list: [
      {
        title: "Writing and Auditing Smart Contracts",
        subtitle: "Develop and audit Ethereum (Solidity) or Binance Smart Chain (BSC) smart contracts, ensuring security with tools like MythX and OpenZeppelin.",
        color: "#8945F8"
      }, {
        title: "Blockchain Consulting",
        subtitle: "Expert consulting on blockchain architecture, including Hyperledger, Ethereum, and Quorum, helping businesses implement projects like supply chain tracking.",
        color: "#2952E3"
      }, {
        title: "Private Blockchain Application",
        subtitle: "Custom-built private blockchain networks using Hyperledger Fabric or R3 Corda for secure, scalable enterprise-grade applications like trade finance.",
        color: "#F84550"
      }, {
        title: "Blockchain DApp",
        subtitle: "Develop decentralized applications on Ethereum or Polkadot, integrating with Web3.js, Metamask, and IPFS for seamless user experiences.",
        color: "#8945F8"
      }, {
        title: "NFT Marketplace Development",
        subtitle: "Build NFT platforms using Ethereum, Polygon, and Flow, integrating ERC721/1155 standards, IPFS storage, and smart contract auction mechanisms like OpenSea.",
        color: "#2952E3"
      }, {
        title: "DeFi (Decentralized Finance) Solutions",
        subtitle: "Create DeFi platforms with Uniswap-like AMMs, yield farming, and staking on Ethereum, Binance Smart Chain, or Solana for seamless financial services.",
        color: "#F84550"
      },
    ],
  };




  const servicesListWeb = {

    title: "Web Development Services",
    des: "I provide comprehensive web development services, including full-stack development with React and Node.js, custom WordPress sites, and scalable Shopify stores. Additionally, I offer API development and IT consulting to ensure seamless integration, performance optimization, and security across your digital infrastructure, helping you achieve your business goals efficiently.",
    list: [
      {
        title: "IT Consulting",
        subtitle: "Get expert guidance on IT infrastructure, security, and scalability tailored to enhance your business’s digital transformation.",
        color: "#8945F8"
      }, {
        title: "Full Stack Development.",
        subtitle: "Deliver end-to-end full-stack development services using modern technologies like React, Node.js, and MongoDB for powerful web applications..",
        color: "#8945F8"
      }, {
        title: "Web API",
        subtitle: "Develop robust and scalable APIs for seamless integration, data management, and communication across your applications.",
        color: "#2952E3"
      }, {
        title: "WordPress Website",
        subtitle: "Create custom WordPress websites tailored to your brand, with optimized performance, SEO, and a user-friendly interface.",
        color: "#F84550"
      }, {
        title: "Shopify Store",
        subtitle: "Launch and scale your Shopify store with custom themes, integrations, and optimizations to enhance the customer shopping experience.",
        color: "#2952E3"
      }
    ],
  };


  return (
    <>

      <div id="services" className="flex w-full justify-center items-center ">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-between md:p-20 py-12 px-4">
          <div className="grid justify-start items-start">
            <h1 className=" uppercase font-bold text-3xl sm:text-5xl py-2 text-primary-color  mt-10  ">
              {servicesListBC.title}
              <br />
            </h1>
            <p className="text-left my-2 text-white font-light w-full md:w-9/12  text-base">
              {servicesListBC.des}
            </p>
          </div>

          <div className="   grid grid-cols-1 md:grid-cols-2 col-span-2 justify-start items-start">

            {
              servicesListBC.list.map((service, index) => (
                <ServiceCard
                  key={index} // Adding the `key` prop
                  color={service.color}
                  title={service.title}
                  icon={<RiHeart2Fill fontSize={21} className="text-white" />}
                  subtitle={service.subtitle}
                />
              ))
            }


          </div>
        </div>
      </div>


      <div id="services" className="flex w-full justify-center items-center  ">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-between md:p-20 py-12 px-4">
          <div className="grid justify-start items-start">
            <h1 className=" uppercase font-bold text-3xl sm:text-5xl py-2 text-primary-color  mt-10  ">
              {servicesListWeb.title}
              <br />
            </h1>
            <p className="text-left my-2 text-white font-light w-full md:w-9/12  text-base">
              {servicesListWeb.des}
            </p>
          </div>

          <div className="   grid grid-cols-1 md:grid-cols-2 col-span-2 justify-start items-start">

            {
              servicesListWeb.list.map((service, index) => (
                <ServiceCard
                  key={index} // Adding the `key` prop
                  color={service.color}
                  title={service.title}
                  icon={<RiHeart2Fill fontSize={21} className="text-white" />}
                  subtitle={service.subtitle}
                />
              ))
            }


          </div>
        </div>
      </div>


      <Logos />
    </>
  );
}

export default Services;
