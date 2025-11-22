import React from "react";
import { Link } from "react-router";

const DetailsNotFound = () => {
  return (
    <div className="flex flex-col">
      <main className="grow">
        <div className="p-5">
          <h1 className="text-white font-bold text-3xl lg:text-5xl text-center">
            Opps!!! Page Not Found
          </h1>
        </div>
        <div className="hero ">
          <div className="hero-content text-center">
            <div className="max-w-2xl">
              <img
                className="rounded-xl"
                src="https://i.ibb.co.com/JRWzczkp/000-404.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-5">
          <Link
            to={"/availableFoods"}
            className="btn btn-lg bg-[#DC143C] text-white font-bold rounded-xl border-none"
          >
            Go Back
          </Link>
        </div>
      </main>
    </div>
  );
};

export default DetailsNotFound;
