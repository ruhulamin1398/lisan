import React from "react";
import ReactDOM from "react-dom";
import {
  AiOutlineClose,
  AiOutlineWhatsApp,
  AiOutlineComment,
} from "react-icons/ai";
import { MdOutlineMenu } from "react-icons/md";

import "animate.css/animate.min.css"; // Import the animate.css library

import "./../style/Navbar.css";
import logo from "../../images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { config } from "../utils/constants";

const NavBarItem = ({ title, classprops, menuLink }) => (
  <li>
    <NavLink
      className={(e) => {
        return e.isActive
          ? `px-3 mx-1 cursor-pointer font-bold text-[#00FF99] `
          : `px-3 mx-1 cursor-pointer hover:text-[#00FF99]   `;
      }}
      to={menuLink}
    >
      {title}
    </NavLink>
  </li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  const menuItems = {
    Home: "/",
    ...(config.settings.services && { Services: "/services" }),
    Projects: "/projects",
    ...(config.settings.research && { Research: "/research" }),
    Experience: "/experience",
    // Blog: "/blog",
    Contact: "/contact",
  };
  const menuArray = Object.entries(menuItems);
  const modalRoot =
    typeof window !== "undefined"
      ? document.getElementById("modal-root")
      : null;

  return (
    <>
      <nav className="w-full flex md:justify-center justify-between items-center p-4  white-glassmorphism border-radius-none  ">
        <div className="md:flex-[0.5] flex-initial justify-center items-center">
          <NavLink to="/">
            <img
              src={logo}
              alt="logo"
              className=" cursor-pointer"
              width="250px"
            />
          </NavLink>
        </div>

        <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
          {menuArray.map(([key, value], index) => (
            <NavBarItem key={key + index} title={key} menuLink={value} />
          ))}
          <li>
            <button
              type="button"
              className="text-black    w-full mt-2 border-[1px] p-2 px-4  hover:border-[#3d4f7c] border-white bg-[#00FF99]  hover:bg-white rounded-xl cursor-pointer"
            >
              <Link to="/contact">Hire Me</Link>
            </button>
          </li>
        </ul>

        <li className="md:flex-[0.5] flex justify-center hidden md:flex ">
          <div className="flex">
            <a
              className="position-relative animate__animated animate__tada animate__infinite flex"
              target="_blank"
              href={config.socialLinks.whatsapp.link}
            >
              <div>
                <AiOutlineWhatsApp className="text-white" size={32} />
                <div className="position-absolute comment-icon">
                  <AiOutlineComment className="text-secondary" />
                </div>
              </div>
            </a>
            <a href={config.socialLinks.whatsapp.link} target="_blank">
              <div className="ml-3 text-white text-xs ">
                Have any questions? <br />
                <span className="text-base">
                  {config.socialLinks.whatsapp.text}
                </span>
              </div>
            </a>
          </div>
        </li>

        <div className="flex relative z-50">
          {!toggleMenu && (
            <MdOutlineMenu
              fontSize={28}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <AiOutlineClose
              fontSize={28}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setToggleMenu(false)}
            />
          )}
        </div>
      </nav>
      {toggleMenu &&
        (modalRoot
          ? ReactDOM.createPortal(
              <div className="fixed top-0 right-0 h-screen w-[70vw] z-[9999] gradient-bg-nav">
                <ul className="p-3 h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md text-white animate-slide-in white-glassmorphism">
                  <li className="text-xl w-full my-2">
                    <AiOutlineClose onClick={() => setToggleMenu(false)} />
                  </li>
                  {menuArray.map(([key, value], index) => (
                    <NavBarItem
                      key={key + index}
                      title={key}
                      menuLink={value}
                    />
                  ))}
                </ul>
              </div>,
              modalRoot
            )
          : (() => {
              console.warn("modal-root not found, rendering nav inline.");
              return (
                <div className="fixed top-0 right-0 h-screen w-[70vw] z-[9999] gradient-bg-nav">
                  <ul className="p-3 h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md text-white animate-slide-in white-glassmorphism">
                    <li className="text-xl w-full my-2">
                      <AiOutlineClose onClick={() => setToggleMenu(false)} />
                    </li>
                    {menuArray.map(([key, value], index) => (
                      <NavBarItem
                        key={key + index}
                        title={key}
                        menuLink={value}
                      />
                    ))}
                  </ul>
                </div>
              );
            })())}
    </>
  );
};

export default Navbar;
