import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar></NavBar>
      <main className="grow">
        <div className="p-5">
        <h1 className="text-gray-700 font-bold text-3xl lg:text-5xl text-center">Opps!!! Page Not Found</h1>
      </div>
      <div className="hero ">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <img className="rounded-xl" src="https://i.ibb.co.com/HLWWVByv/Error-Page.webp" alt="" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-5">
        <Link
          to={"/"}
          className="btn bg-[#15803D] text-white rounded border-none"
        >
          Go Home
        </Link>
      </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default ErrorPage;
