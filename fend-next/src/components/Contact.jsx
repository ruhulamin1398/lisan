"use client";

import { useContext } from "react";
import { Loader } from ".";
import { MdEmail, MdOutlineDeveloperBoard } from "react-icons/md";
import { RiLinkedinFill, RiWhatsappFill } from "react-icons/ri";
import { FaGoogleScholar, FaResearchgate } from "react-icons/fa6";
import { TransactionContext } from "../context/TransactionContext";
import { config } from "../utils/constants";

const Input = ({ placeholder, name, type, value, handleChange, className }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className={`my-2 w-full rounded-sm p-4 outline-none bg-transparent text-white border-lg text-sm white-glassmorphism ${className}`}
  />
);

const Select = ({ options, name, value, handleChange, className }) => (
  <div className="relative my-2 w-full">
    <select
      value={value}
      onChange={(e) => handleChange(e, name)} // Uncomment this line
      className={`appearance-none my-2 w-full rounded-sm p-4 outline-none bg-transparent text-white/60 border-lg text-sm white-glassmorphism ${className}`}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value} className="text-black">
          {option.label}
        </option>
      ))}
    </select>
    {/* Custom Arrow */}
    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
      <svg
        className="w-4 h-4 text-white/60"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
);

const ContactCard = ({ color, title, icon, subtitle, className, link }) => (
  <a href={link} target="_blank">
    <div
      className={`flex  justify-start items-start  p-3 m-2 cursor-pointer  ${className}`}
    >
      <div className=" hover:shadow-xl  white-glassmorphism p-4">
        <div
          className={`w-10 h-10 rounded-full flex justify-center items-center my-auto    `}
        >
          {icon}
        </div>
      </div>
      <div className="ml-5 flex flex-col flex-1 my-auto">
        <p
          className="  text-white text-base md:w-12/12"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <h3 className="  text-primary-color text-lg font-bold"> {subtitle}</h3>
      </div>
    </div>
  </a>
);

const Contact = () => {
  const { formData, handleChange, handleSubmit, isLoaing } =
    useContext(TransactionContext);

  const options = [
    { value: "", label: "Select service" },
    { label: "Blockchain Services", value: "blockchain" },
    { label: "Web Development Services", value: "web" },
  ];

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col md:flex-row md:row-reverse items-start justify-between md:p-20 w-full md:w-[80%]">
        <div className="flex flex-1 justify-center items-center flex-col mf:mr-10 my-auto my-24">
          <div>
            {Object.values(config.socialLinks).map((social, idx) => {
              const Icon = social.Icon;
              return (
                <ContactCard
                  color={social.color}
                  title={social.title}
                  icon={
                    <Icon fontSize={21} className="" color={social.color} />
                  }
                  subtitle={social.text}
                  className="  "
                  link={social.link}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-0 pt-5 px-2 md:px-5 md:py-12 blue-glassmorphism">
          <h1 className="   font-bold text-3xl sm:text-3xl py-2 text-primary-color  mt-2  ">
            Let`s Work Together
          </h1>

          <p className="text-center mb-1 text-white font-light md:w-9/12 w-11/12 text-base ">
            Could you kindly fill out this form so that I may connect with
            you?{" "}
          </p>

          <div className="p-5 sm:w-full w-full flex flex-col justify-start items-center ">
            <Input
              placeholder="Enter your name"
              name="name"
              handleChange={handleChange}
              type="text"
            />
            <Input
              placeholder="Enter your email"
              name="email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              placeholder="Enter your Phone"
              name="phone"
              handleChange={(e) => handleChange(e, "phone")}
              type="text"
            />
            <Select
              options={options}
              name="serviceType"
              value={formData.serviceType || ""}
              handleChange={(selectedOption) =>
                handleChange(selectedOption, "serviceType")
              }
            />

            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-white/10 px-4 py-5 placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 h-[150px] bg-transparent text-white border-lg text-sm white-glassmorphism"
              placeholder="Type your message here"
              name="message"
              value={formData.message}
              onChange={(e) => handleChange(e, "message")}
            ></textarea>

            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {isLoaing ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#00ff99] hover:text-black rounded-full cursor-pointer"
              >
                Send message
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
