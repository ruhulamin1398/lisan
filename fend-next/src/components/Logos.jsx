"use client";

import React, { useState, useEffect } from "react";
import { renderLogo } from "./LogoRegistry";
import { config } from "../utils/constants";

const Logo = ({ title, logoType, logoKey, customStyle }) => {
  return (
    <div className="ml-5 mt-4 text-center flex-auto p-[15px] white-glassmorphism h-[120px] hover:shadow-xl">
      {renderLogo(logoType, logoKey, customStyle)}
      <div className={customStyle}>{title}</div>
    </div>
  );
};

const Logos = () => {
  const [logos, setLogos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        // Determine site from env (same logic as constants.jsx)
        const env = process.env.NEXT_PUBLIC_ENV || "";
        let site = "lisan";
        if (env === "ruhul-dev") site = "ruhul-dev";
        else if (env === "ruhul-scholarship") site = "ruhul-scholarship";
        else if (env === "ruhul-blockchain") site = "ruhul-blockchain";

        const res = await fetch(`/api/public/logos?site=${site}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setLogos(data);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn("Failed to fetch logos from DB, falling back to config", e);
      }

      // Fallback to config data
      setLogos(null);
      setLoading(false);
    };

    fetchLogos();
  }, []);

  if (loading) {
    return (
      <div id="Logos" className="flex w-full justify-center items-center">
        <div className="flex flex-col items-center justify-between md:p-20 px-4">
          <div className="text-gray-400 text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  // If no DB data, render from config (backward compat)
  const hasDbData = logos !== null;

  return (
    <div id="Logos" className="flex w-full justify-center items-center">
      <div className="flex flex-col items-center justify-between md:p-20 px-4">
        <div className="flex flex-col justify-start items-center py-6 w-100">
          <h1 className="uppercase font-bold text-3xl sm:text-5xl py-2 text-primary-color">
            Experienced In
            <br />
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2 p-3 m-2 mx-2 w-full">
          {hasDbData
            ? logos.map((logo, index) => (
                <Logo
                  key={logo._id || index}
                  title={logo.title}
                  logoType={logo.logoType}
                  logoKey={logo.logoKey}
                  customStyle={logo.customStyle}
                  displayOrder={logo.displayOrder}
                />
              ))
            : config.logos.map((logo, index) => {
                // For config-based logos, we need to detect type
                // Config logos have `logo` as a React element, not logoType/logoKey
                // So we render them directly
                return (
                  <div
                    key={index}
                    className="ml-5 mt-4 text-center flex-auto p-[15px] white-glassmorphism h-[120px] hover:shadow-xl"
                  >
                    {logo.logo}
                    <div className={logo.customStyle}>{logo.title}</div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Logos;
