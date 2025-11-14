import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import Dropdown from "../../utilities/Dropdown";

const NavBar = () => {
  const { user } = useContext(AuthContext);

  const activeStyle = "text-black lg:text-white font-bold text-2xl border-b-4 border-white";
  const normalStyle = "text-white font-bold text-xl";

  const links = (
    <>
      <div className="flex flex-col lg:flex-row lg:gap-10">
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Home
        </NavLink>
        <NavLink
          to={"/availableFoods"}
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Available Foods
        </NavLink>
      </div>
    </>
  );

  return (
    <div>
      <div className="navbar bg-[#DC143C] text-white shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div>
            <img className="w-sm md:w-lg" src="https://i.ibb.co.com/xSTHvjXJ/logo-1-Picsart-Background-Remover-1.png" alt="" />
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div>
              <Dropdown></Dropdown>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="btn btn-lg bg-white text-[#DC143C] font-bold rounded-xl border-none"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
