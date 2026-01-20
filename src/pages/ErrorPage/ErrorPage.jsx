import React from "react";
import NavBar from "../../components/NavBar/NavBar";

import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-white">
        <div className="text-center mb-8">
          <h1 className="text-[#DC143C] font-bold text-3xl md:text-4xl lg:text-5xl">
            Oops! Page Not Found
          </h1>
        </div>

        <div className="max-w-md w-full mb-10">
          <img
            className="rounded-xl w-full shadow-lg"
            src="https://i.ibb.co.com/HLWWVByv/Error-Page.webp"
            alt="Page not found illustration"
          />
        </div>

        <div>
          <Link
            to={"/"}
            className="btn bg-[#DC143C] text-white font-bold rounded-xl border-none hover:bg-[#b81232] shadow-md hover:shadow-lg transition-all duration-300 px-8 py-3"
          >
            Go Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
