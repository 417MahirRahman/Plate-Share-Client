import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import Dropdown from "../../utilities/Dropdown";

const NavBar = () => {

  const { user } = useContext(AuthContext);

    const activeStyle = "text-red-500"
    const normalStyle = "text-green-500"

  const links = (
    <>
      <div className="flex gap-10">
        <NavLink className={activeStyle ? activeStyle : normalStyle}>Home</NavLink>
        <NavLink to={"/availableFoods"} className={activeStyle ? activeStyle : normalStyle}>Available Foods</NavLink>
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
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Plate Share</a>
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
              className="btn bg-[#FACC15] border-none text-[#15803D]"
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
