import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress, donationAddress } from "../utils/constants";

export const TransactionContext = React.createContext();




export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({});
  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };




  useEffect(() => {
    console.log("form data is ", formData);
  }, [formData])


  return (
    <TransactionContext.Provider
      value={{

        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
