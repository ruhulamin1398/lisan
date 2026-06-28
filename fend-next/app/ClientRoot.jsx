"use client";

import { usePathname } from "next/navigation";
import { TransactionsProvider } from "../src/context/TransactionContext";
import { Navbar, Footer } from "../src/components";
import { ToastContainer } from "react-toastify";

export default function ClientRoot({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isBlogRoute = pathname?.startsWith("/blog");

  return (
    <TransactionsProvider>
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute || isBlogRoute ? "pb-0" : "pb-[100px]"}>{children}</main>
      {!isAdminRoute && <Footer />}
      <ToastContainer />
      <div id="modal-root"></div>
    </TransactionsProvider>
  );
}
