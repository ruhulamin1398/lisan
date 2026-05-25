"use client";

import { TransactionsProvider } from "../src/context/TransactionContext";
import { Navbar, Footer } from "../src/components";
import { ToastContainer } from "react-toastify";

export default function ClientRoot({ children }) {
  return (
    <TransactionsProvider>
      <Navbar />
      <main className="pb-[100px]">{children}</main>
      <Footer />
      <ToastContainer />
      <div id="modal-root"></div>
    </TransactionsProvider>
  );
}
