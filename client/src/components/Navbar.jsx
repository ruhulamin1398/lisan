import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineWhatsApp, AiOutlineComment } from "react-icons/ai";


import 'animate.css/animate.min.css'; // Import the animate.css library

import "./../style/Navbar.css"
import logo from "../../images/logo.png";

const NavBarItem = ({ title, classprops, menuLink }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}> <a href={menuLink}>  {title} </a></li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);


  const menuItems = {
    Home: "#",
    Research: "#",
    Experience: "#",
    blog: "#",
    Contract: "#services",
    More: "",
  };
  const menuArray = Object.entries(menuItems);



  return (

    <>
    {/* <div id="top-bar" className="py-2 px-5 bg-gray">  
      Lorem ipsum dolor sit amet.
    </div> */}
    

    <nav className="w-full flex md:justify-center justify-between items-center p-4  white-glassmorphism border-radius-none  " >
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <a href="#"  >  
          
          <img src={logo} alt="logo" className=" cursor-pointer" width="250px" />
          
          </a>
      </div>

      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {menuArray.map(([key, value], index) => (


          <NavBarItem key={key + index} title={key} menuLink={value} />
        ))}


      </ul>


      <li className="md:flex-[0.5] flex justify-center ">


   <div className="flex">
   <a className="position-relative animate__animated animate__tada animate__infinite flex">
          <div  >
            <AiOutlineWhatsApp className="text-white" size={32} />
            <div className="position-absolute comment-icon">
              <AiOutlineComment className="text-secondary" />
            </div>

          </div>
        </a>

        <div className="ml-3 text-white">
          Have any questions?  <br />
          <span className="text-lg"> +880184 0000 408</span>
        </div>

   </div>


      </li>


      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {menuArray.map(([key, value], index) => (
              <NavBarItem key={key + index} title={key} menuLink={value} />
            ))}
          </ul>
        )}
      </div>
    </nav>
    
    </>


  );
};

export default Navbar;
