import React from "react";
import { FaEthereum } from "react-icons/fa6";
import { SiExpress, SiMongodb, SiMysql, SiSolidity, SiTailwindcss } from "react-icons/si";
import { BiHardHat, BiSolidHardHat } from "react-icons/bi";
import { FaAws, FaDocker, FaHardHat, FaNodeJs, FaPhp, FaReact } from "react-icons/fa";
import { TbCurrencySolana } from "react-icons/tb";
import { SiIpfs } from "react-icons/si";
import { GiMongolia } from "react-icons/gi";
import fabricLogo from "../../images/hlf2.png";
import metamaskLogo from "../../images/metamask.png"


const Logo = ({ title, logo, customStyle }) => {



    return (
        <>

            <div className="ml-5 text-center  flex-auto p-[15px] white-glassmorphism h-[120px] hover:shadow-xl ">

                {logo}

                <div class={` ${customStyle}`}>{title}</div>
            </div>
        </>
    )
}



const Logos = () => (
    <> 
        <div id="Logos" className="flex w-full justify-center items-center gradient-bg-services " >
            <div className="flex  flex-col  items-center justify-between md:p-20   px-4">

                <div className="flex flex-col justify-start items-center    py-6 w-100">
                    <h1 className=" uppercase font-bold   text-3xl sm:text-5xl py-2  text-primary-color    ">
                        Experienced In
                        <br />

                    </h1>

                </div>


                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8  gap-2 p-3 m-2 mx-2 w-full">

                    <Logo
                        customStyle="text-[#c8c8c8]"
                        logo={<FaEthereum fontSize={60} className="text-[#c8c8c8]  mx-auto py-2" />}
                        title="Ethereum"
                    />

                    <Logo
                        customStyle="text-[#c8c8c8]"
                        logo={<img src={fabricLogo} className="text-[#c8c8c8] h-[60px] mx-auto py-2 " />}
                        title="Hyperledger Fabric"
                    />

                    <Logo
                        customStyle="text-[#c8c8c8]"
                        logo={<TbCurrencySolana fontSize={60} className="text-[#c8c8c8] mx-auto py-2 " />}
                        title="Solana"
                    />

                    <Logo
                        customStyle="text-[#c8c8c8]"
                        logo={<SiSolidity fontSize={60} className="text-black  mx-auto py-2" />}
                        title="Solidity"
                    />
                    <Logo
                        customStyle="text-[#c8c8c8]"
                        logo={<svg className="mx-auto py-2" width="60" height="60" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF100" d="M50.782 31.593v-2.42c0-.45-.757-.88-2.116-1.266l.033-3.014c0-4.641-1.44-9.17-4.126-12.975a22.825 22.825 0 0 0-10.886-8.29l-.097-.604a1.722 1.722 0 0 0-.408-.872 1.747 1.747 0 0 0-.815-.521 23.147 23.147 0 0 0-12.925 0c-.317.093-.6.273-.818.52-.217.246-.36.548-.41.872l-.093.563A22.83 22.83 0 0 0 7.159 11.87 22.498 22.498 0 0 0 3 24.892v3.027c-1.34.385-2.087.81-2.087 1.256v2.421a.59.59 0 0 0 .087.408 5.852 5.852 0 0 1 2.247-1.015c2.072-.5 4.179-.85 6.303-1.046A4.25 4.25 0 0 1 12.857 31a8.95 8.95 0 0 0 6.009 2.313H32.83a8.943 8.943 0 0 0 6.008-2.314 4.253 4.253 0 0 1 3.308-1.069c2.123.195 4.23.543 6.302 1.042.77.146 1.498.462 2.13.924.035.035.078.066.108.1a.6.6 0 0 0 .096-.403Z" /><path d="M12.89 26.498a53.052 53.052 0 0 1-.03-1.673c.007-8.416 1.992-15.964 5.262-21.235A22.83 22.83 0 0 0 7.16 11.872 22.498 22.498 0 0 0 3 24.892v3.027a55.919 55.919 0 0 1 9.89-1.42Z" fill="url(#a)" /><path d="M25.846 7.818 20.5 16.841l5.346 3.288V7.818Z" fill="#0A0A0A" /><path d="M25.848 7.822v12.305l5.345-3.284-5.345-9.021ZM25.848 21.915v4.29c.1-.142 5.345-7.58 5.345-7.583l-5.345 3.293Z" fill="#4B4D4D" /><path d="m25.848 21.916-5.346-3.288 5.346 7.58v-4.294.002Z" fill="#0A0A0A" /></svg>}
                        title="Hard&nbsp;Hat"

                    />




                    <Logo
                        customStyle="text-[#c8c8c8]"
                        logo={<img src={metamaskLogo} className="text-[#c8c8c8] h-[60px] mx-auto py-2 " />}
                        title="Meta&nbsp;Mask"
                    />


                    <Logo
                        customStyle="text-[#c8c8c8]"
                        logo={<SiIpfs fontSize={60} className="text-[#c8c8c8]  mx-auto py-2 " />}
                        title="IPFS"
                    />


                    <Logo
                        customStyle="text-[#c8c8c8]"
                        logo={
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
                                style={{ enableBackground: 'new 0 0 100 58' }}
                            >
                                <style type="text/css">
                                    {`.st0{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}`}
                                </style>
                                <path width="60" height="60"
                                    className="st0"
                                    d="M94.45,47.18c-42.62,5.57-73.04,12.26-73.49-15.2c0,0,0.93-10.64,13.98-11.31c0,0,0.44-9.45,10.41-10.52  c5.36-0.58,11.45,4.94,12.11,10.75c0,0,13.19-2.44,13.76,10.42c0.2,4.48-0.81,12.1-13.53,11.77c0,0-7.36-1-8.36-12.38  c-2.07,22.03,29.78,20.75,30.24,0.74c0.2-8.65-5.34-17.55-17.82-15.88C54.91-1.64,36.7-0.65,29.92,15.31  c-9.69,0-17.1,7.46-16.99,17.2C13.3,63.86,56.93,54.41,94.45,47.18z"
                                />
                            </svg>
                        }
                        title="Ether&nbsp;Js"
                    />






                </div>



                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8  gap-2 p-3 m-2 mx-2 w-full">

                    <Logo
                        customStyle="text-[#c8c8c8]"
                        logo={<FaNodeJs fontSize={60} className="text-[#c8c8c8]  mx-auto py-2" />}
                        title="NodeJs"
                    />

                    <Logo
                        customStyle="text-[#c8c8c8]"
                        logo={<FaReact fontSize={60} className="text-[#c8c8c8]  mx-auto py-2" />}
                        title="ReactJS"
                    />

                    <Logo
                        customStyle="text-[#c8c8c8]"
                        logo={<FaPhp fontSize={60} className="text-white  mx-auto py-2" />}
                        title="PHP"
                    />


                    <Logo
                        customStyle="text-[#c8c8c8]"
                        logo={<SiTailwindcss fontSize={60} className="text-white  mx-auto py-2" />}
                        title="TailwindCSS"
                    />






                    <Logo
                        customStyle="text-[#c8c8c8]"
                        logo={<SiMysql fontSize={60} className="text-[#c8c8c8] mx-auto py-2 " />}
                        title="MySql"
                    />

                    <Logo
                        customStyle="text-[#c8c8c8]"
                        logo={<SiMongodb fontSize={60} className="text-[#c8c8c8] mx-auto py-2 " />}
                        title="MongoDb"
                    />

                    <Logo
                        customStyle="text-[#c8c8c8]"
                        logo={<FaDocker fontSize={60} className="text-[#c8c8c8]  mx-auto py-2 " />}
                        title="Docker"
                    />
                    <Logo
                        customStyle="text-[#c8c8c8]"
                        logo={<FaAws fontSize={60} className="text-white  mx-auto py-2" />}
                        title="AWS"
                    />








                </div>




            </div>
        </div>
    </>
);

export default Logos;
