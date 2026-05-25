// src/components/NotFound.jsx
import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-white">
      <h1 className="text-9xl font-bold  text-white ">404</h1>
      <h2 className="text-2xl md:text-3xl font-medium mt-4">Page Not Found</h2>
      <p className="mt-2 text-center max-w-md">
        Sorry, the page you are looking for does not exist. You may have
        mistyped the address or the page may have moved.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 text-white rounded-lg white-glassmorphism transition-colors hover:border-white"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
