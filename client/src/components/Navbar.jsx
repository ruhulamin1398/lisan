import React from "react";
import { AiOutlineClose, AiOutlineWhatsApp, AiOutlineComment } from "react-icons/ai";
import { MdOutlineMenu } from "react-icons/md";

import 'animate.css/animate.min.css'; // Import the animate.css library

import "./../style/Navbar.css"
import logo from "../../images/logo.png";
import { Link, NavLink } from "react-router-dom";

 


const NavBarItem = ({ title, classprops, menuLink }) => (
  <li   >  

  <NavLink className={(e)=> {return e.isActive? "px-3 mx-1 cursor-pointer font-bold" :"px-3 mx-1 cursor-pointer"}} to={menuLink}>{title }</NavLink>
  
  
  </li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

 


  const menuItems = {
    Home: "/",
    Research: "/research",
    Experience: "/experience",
    Blog: "/blog",
    Contract: "/contract",
    More: "/more",
  };
  const menuArray = Object.entries(menuItems);



  return (

    <>
    


      <nav className="w-full flex md:justify-center justify-between items-center p-4  white-glassmorphism border-radius-none  " >
        <div className="md:flex-[0.5] flex-initial justify-center items-center">
          <NavLink to="/" >

            <img src={logo} alt="logo" className=" cursor-pointer" width="250px" />

          </NavLink>
        </div>

        <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        
        {menuArray.map(([key, value], index) => (
                <NavBarItem key={key + index} title={key} menuLink={value} />
              ))}
<li>
<button type="button" class="text-black hover:text-white w-full mt-2 border-[1px] p-2 px-4  hover:border-[#3d4f7c] border-white bg-white hover:bg-[#3d4f7c] rounded-xl cursor-pointer">
        <Link to="/contact"     > 
        Hire Me
         </Link>

</button>
</li>
        </ul>


        <li className="md:flex-[0.5] flex justify-center hidden md:flex ">
          <div className="flex">
            <a className="position-relative animate__animated animate__tada animate__infinite flex">
              <div  >
                <AiOutlineWhatsApp className="text-white" size={32} />
                <div className="position-absolute comment-icon">
                  <AiOutlineComment className="text-secondary" />
                </div>

              </div>
            </a>

            <div className="ml-3 text-white text-xs ">
              Have any questions?  <br />
              <span className="text-base"> +880184 0000 408</span>
            </div>
          </div>
        </li>


        <div className="flex relative">
          {!toggleMenu && (
            <MdOutlineMenu fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
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
