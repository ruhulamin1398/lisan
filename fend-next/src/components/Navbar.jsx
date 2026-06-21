"use client";

import React from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AiOutlineClose,
  AiOutlineWhatsApp,
  AiOutlineComment,
} from "react-icons/ai";
import { MdOutlineMenu } from "react-icons/md";

import "animate.css/animate.min.css"; // Import the animate.css library

import "./../style/Navbar.css";
import logo from "../../images/logo.png";
import { config } from "../utils/constants";

const getImageSrc = (image) => {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image?.src ?? "";
};

const NavBarItem = ({ title, menuLink }) => {
  const pathname = usePathname();
  const isActive = pathname === menuLink;

  return (
    <li>
      <Link
        href={menuLink}
        className={
          isActive
            ? "px-3 mx-1 cursor-pointer font-bold text-[#00FF99]"
            : "px-3 mx-1 cursor-pointer hover:text-[#00FF99]"
        }
      >
        {title}
      </Link>
    </li>
  );
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  const menuItems = {
    Home: "/",
    ...(config.settings.services && { Services: "/services" }),
    ...(config.settings.projects && { Projects: "/projects" }),
    ...(config.settings.blog && { Blog: "/blog" }),
    ...(config.settings.research && { Research: "/research" }),
    ...(config.settings.experience && { Experience: "/experience" }),
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
          <Link href="/">
            {config.name === "Lisan Rahman" ? (
              <div className="text-white  font-bold font-md-[100px] text-xl  md:text-3xl">
                Lisan Rahman
              </div>
            ) : (
              <img
                src={getImageSrc(config.logo) || getImageSrc(logo)}
                alt="logo"
                className="cursor-pointer"
                width="250px"
              />
            )}
          </Link>
        </div>

        <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
          {menuArray.map(([key, value], index) => (
            <NavBarItem key={key + index} title={key} menuLink={value} />
          ))}
          <li>
            <Link
              href="/contact"
              className="text-black w-full mt-2 border-[1px] p-2 px-4 hover:border-[#3d4f7c] border-white bg-[#00FF99] hover:bg-white rounded-xl cursor-pointer flex justify-center"
            >
              Hire Me
            </Link>
          </li>
        </ul>

        <li className="md:flex-[0.5] flex justify-center hidden md:flex ">
          <div className="flex">
            <a
              className="position-relative animate__animated animate__tada animate__infinite flex"
              target="_blank"
              href={config.socialLinks.whatsapp.link}
              rel="noreferrer"
            >
              <div>
                <AiOutlineWhatsApp className="text-white" size={32} />
                <div className="position-absolute comment-icon">
                  <AiOutlineComment className="text-secondary" />
                </div>
              </div>
            </a>
            <a
              href={config.socialLinks.whatsapp.link}
              target="_blank"
              rel="noreferrer"
            >
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
              modalRoot,
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
