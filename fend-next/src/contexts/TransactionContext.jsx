"use client";

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL, APP_URL, BASE_API_URL } from "../utils/constants";
import { toast } from "react-toastify";

export const TransactionContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({});
  const [isLoaing, setIsLoading] = useState(false);

  const handleChange = (e, name) => {
    const value = e?.target ? e.target.value : e.value; // Handle both input and select
    console.log(name, value);
    setformData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    setIsLoading(true);
    console.log("Submit data is:", formData);

    try {
      const res = await axios.post(`${API_URL}/contact/new`, formData);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (res.status === 200) {
        // ✅ Ensure the request is successful
        toast.success("Successfully Saved!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save. Please try again!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setIsLoading(false); // ✅ Always reset loading state
    }
  };
  useEffect(() => {
    console.log("form data is ", formData);
  }, [formData]);

  return (
    <TransactionContext.Provider
      value={{
        handleChange,
        formData,
        handleSubmit,
        isLoaing,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
