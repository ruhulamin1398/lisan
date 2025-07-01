import React from "react";
import { FaEthereum } from "react-icons/fa6";
import {
  SiExpress,
  SiMongodb,
  SiMysql,
  SiSolidity,
  SiTailwindcss,
} from "react-icons/si";
import { BiHardHat, BiSolidHardHat } from "react-icons/bi";
import {
  FaAws,
  FaDocker,
  FaHardHat,
  FaNodeJs,
  FaPhp,
  FaReact,
} from "react-icons/fa";
import { TbCurrencySolana } from "react-icons/tb";
import { SiIpfs } from "react-icons/si";
import { GiMongolia } from "react-icons/gi";
import fabricLogo from "../../images/hlf2.png";
import metamaskLogo from "../../images/metamask.png";
import { logos } from "../utils/constants";

const Logo = ({ title, logo, customStyle }) => {
  return (
    <>
      <div className="ml-5 mt-4 text-center  flex-auto p-[15px] white-glassmorphism h-[120px] hover:shadow-xl ">
        {logo}

        <div class={` ${customStyle}`}>{title}</div>
      </div>
    </>
  );
};

const Logos = () => (
  <>
    <div id="Logos" className="flex w-full justify-center items-center   ">
      <div className="flex  flex-col  items-center justify-between md:p-20   px-4">
        <div className="flex flex-col justify-start items-center    py-6 w-100">
          <h1 className=" uppercase font-bold   text-3xl sm:text-5xl py-2  text-primary-color    ">
            Experienced In
            <br />
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8  gap-2 p-3 m-2 mx-2 w-full">
          {logos.map((logo, index) => (
            <Logo
              key={index}
              customStyle={logo.customStyle}
              logo={logo.logo}
              title={logo.title}
            />
          ))}
        </div>
      </div>
    </div>
  </>
);

export default Logos;
