import React from "react";
import { RiHeart2Fill, RiFacebookFill, RiLinkedinFill } from "react-icons/ri";
import { SiResearchgate, SiGooglescholar } from "react-icons/si";
import { MdOutlineDeveloperBoard, MdAlternateEmail } from "react-icons/md";
import { GiArchiveResearch, GiTeacher } from "react-icons/gi";



import "../style/Hero.css"; // Import your custom CSS file

import ruhulImg from "../../images/ruhul2.png";

const HeroCard = ({ color, title, icon, subtitle, className }) => (
  <div className={`flex  justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl ${className}`}>
    <div className={`w-10 h-10 rounded-full flex justify-center items-center my-auto ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-1 text-primary-color text-lg font-bold">{title}</h3>
      <p className="my-1 text-white text-sm md:w-12/12" dangerouslySetInnerHTML={{ __html: subtitle }} />

    </div>
  </div>
);

const Hero = () => (
  <>
    <div id="hero" className="  w-full justify-center items-center pb-[100px] ">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-5 md:px-20 py-2 px-4">
        <div className="flex-1 flex flex-col justify-start items-center">

          <img src={ruhulImg} alt="logo" className=" cursor-pointer   w-100 " />



          <div className="white-glassmorphism w-full px-12 py-4 flex gap-6  justify-center items-center  " >

            <div className={`w-10 h-10 rounded-full flex justify-center items-center  bg-white  `}>

              <a href="https://www.linkedin.com/in/theruhulamin/" target="_blank">{<RiLinkedinFill fontSize={21} className="text-[#2952E3]" />}</a>

            </div>

            <div className={`w-10 h-10 rounded-full flex justify-center items-center  bg-white  `}>

              <a href="https://www.researchgate.net/profile/Ruhul-Amin-95" target="_blank">{<SiResearchgate fontSize={21} className="text-[#2952E3]" />}
              </a>

            </div>

            <div className={`w-10 h-10 rounded-full flex justify-center items-center  bg-white  `}>

              <a href="https://scholar.google.com/citations?user=pW39RGYAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">{<SiGooglescholar fontSize={21} className="text-[#2952E3]" />}
              </a>
            </div>

            <div className={`w-10 h-10 rounded-full flex justify-center items-center  bg-white  `}>

              <a href="https://www.facebook.com/ruhulamin1398" target="_blank" rel="noopener noreferrer">{<RiFacebookFill fontSize={21} className="text-[#2952E3]" />} </a>

            </div>


            <div className={`w-10 h-10 rounded-full flex justify-center items-center  bg-white  `}>

              <a href="mailto:ruhulamin010398@gmail.com">{<MdAlternateEmail fontSize={21} className="text-[#2952E3]" />} </a>

            </div>








          </div>



        </div>

        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className=" font-bold text-3xl sm:text-5xl py-2 text-primary-color  mt-10  ">
            RUHUL AMIN
          </h1>
          <p className="text-left my-1 text-white font-light md:w-9/12 w-11/12 text-base mb-2">

            Working as Blockchain Developer AAk Tele-Science Inc. 
            



          </p>
          <div className="hero-cards-container">
            <HeroCard
              color="bg-[#8945F8]"
              title="Developer"
              icon={<MdOutlineDeveloperBoard fontSize={21} className="text-white" />}
              subtitle="5+ years Experience in Web Development. <br/> 1+ year experience in Full-stack Blockchain development."
              className="hero-card hero-card-1  "
            />
            <HeroCard
              color="bg-[#2952E3]"
              title="Researcher"
              icon={<GiArchiveResearch fontSize={21} className="text-white" />}
              subtitle="Published 10+ Research Papers. <br/> Supervised 20+ students. <br/> Reviewed 50+ Papers."
              className="hero-card hero-card-2"
            />
            <HeroCard
              color="bg-[#F84550]"
              title="Teacher"
              icon={<GiTeacher fontSize={21} className="text-white" />}
              subtitle="1+ year Experience in University teaching."
              className="hero-card hero-card-3"
            />
          </div>
        </div>
      </div>


    </div>

  </>
);

export default Hero;
