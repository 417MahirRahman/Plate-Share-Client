import React from "react";
import { NavLink } from "react-router";

const NavBar = () => {

    const activeStyle = "text-red-500"
    const normalStyle = "text-green-500"

  const link1 = (
    <>
      <div className="flex gap-10">
        <NavLink className={activeStyle ? activeStyle : normalStyle}>Home</NavLink>
        <NavLink className={activeStyle ? activeStyle : normalStyle}>Available Foods</NavLink>
      </div>
    </>
  );

  const link2 = (
    <>
      <div className="flex flex-col">
        <NavLink>Add Food</NavLink>
        <NavLink>Manage My Foods</NavLink>
        <NavLink>My Food Requests</NavLink>
        <NavLink>Logout</NavLink>
      </div>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
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
              {link2}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Plate Share</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{link1}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Login</a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
