import { createElement } from "react";
import { MdOutlineDeveloperBoard } from "react-icons/md";
import { GiArchiveResearch, GiTeacher } from "react-icons/gi";

import "../style/Hero.css"; // Import your custom CSS file

import ruhulImg from "../../images/ruhul2.png";
import { heroContent, socialLinks } from "../utils/constants";

const HeroCard = ({ color, title, icon, subtitle, className }) => (
  <div
    className={`flex  justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl ${className}`}
  >
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center my-auto ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-1 text-primary-color text-lg font-bold">{title}</h3>
      <p
        className="my-1 text-white text-sm md:w-12/12"
        dangerouslySetInnerHTML={{ __html: subtitle }}
      />
    </div>
  </div>
);

const Hero = () => (
  <>
    <div id="hero" className="  w-full justify-center items-center pb-[100px] ">
      <div className="flex   flex-col md:flex-row items-center justify-between md:p-5 md:px-20 py-2 px-4">
        <div className="flex-1 flex flex-col justify-start items-center">
          <img src={ruhulImg} alt="logo" className=" cursor-pointer   w-100 " />

          <div className="white-glassmorphism w-full px-12 py-4 flex gap-6  justify-center items-center  ">
            {Object.values(socialLinks).map((social, idx) => {
              const Icon = social.Icon;
              return (
                <div
                  key={idx}
                  className="w-10 h-10 rounded-full flex justify-center items-center bg-white"
                >
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon fontSize={21} className="" color={social.color} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className=" font-bold text-3xl sm:text-5xl py-2 text-primary-color  mt-10  ">
            {heroContent.name}
          </h1>
          <p className="text-left my-1 text-white font-light md:w-9/12 w-11/12 text-base mb-2">
            {heroContent.tagLine}
          </p>
          <div className="hero-cards-container">
            {heroContent.overViewList.map((item, idx) => {
              return (
                <HeroCard
                  key={idx}
                  color={item.color}
                  title={item.title}
                  icon={item.icon}
                  subtitle={item.description}
                  className={`hero-card hero-card-${idx + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Hero;
