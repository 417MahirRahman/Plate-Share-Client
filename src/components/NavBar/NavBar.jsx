import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import Dropdown from "../../utilities/Dropdown";

const NavBar = () => {
  const { user } = useContext(AuthContext);

  const activeStyle =
    "text-[#DC143C] font-bold text-lg border-b-2 border-[#DC143C] pb-1";
  const normalStyle = "text-gray-700 hover:text-[#DC143C] font-medium text-lg";

  const links = (
    <>
      <div className="flex flex-col lg:flex-row lg:gap-8">
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
        {user && (
          <div className="flex flex-col lg:flex-row lg:gap-8">
            <NavLink
              to={"/dashboardLayout"}
              className={({ isActive }) =>
                isActive ? activeStyle : normalStyle
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to={"/addFood"}
              className={({ isActive }) =>
                isActive ? activeStyle : normalStyle
              }
            >
              Add Food
            </NavLink>
          </div>
        )}

        <NavLink
          to={"/about"}
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          About
        </NavLink>
      </div>
    </>
  );

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-white text-gray-800 shadow-md border-b border-gray-200">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-white rounded-box z-99 mt-3 w-52 p-2 shadow-lg border"
            >
              {links}
            </ul>
          </div>
          <div>
            <img
              className="w-2/5"
              src="https://i.ibb.co.com/whJDpkCy/png-Picsart-Background-Remover.png"
              alt="PlateShare Logo"
            />
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-8">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div>
              <Dropdown />
            </div>
          ) : (
            <Link
              to={"/login"}
              className="btn btn-lg bg-[#DC143C] text-white font-bold rounded-lg hover:bg-[#b81232] border-none shadow-sm"
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
