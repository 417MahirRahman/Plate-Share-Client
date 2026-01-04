import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, Bounce } from "react-toastify";
import { IoIosLogOut } from "react-icons/io";
import { Link, NavLink } from "react-router";
import { User } from "lucide-react";

const Dropdown = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Log Out Successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((error) => {
        const msg = error.message;
        toast.error(`${msg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };
  return (
    <div>
      <details className="dropdown dropdown-bottom dropdown-end">
        <summary className="border w-10 avatar rounded-full m-1">
          <img
            className="rounded-full avatar"
            src={user.photoURL ? user.photoURL : "ProfilePic"}
            alt=""
          />
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
          <li>
            <div>
              <User size={16} className="text-black font-bold" />
              <Link
                to={"/profile"}
                className="font-bold text-black"
              >
                Profile
              </Link>
            </div>
          </li>
          <li className="flex gap-1">
            <div>
              <IoIosLogOut className="text-black font-bold" />
              <Link
                onClick={handleLogOut}
                to={"/login"}
                className="font-bold text-black"
              >
                Log Out
              </Link>
            </div>
          </li>
        </ul>
      </details>
    </div>
  );
};

export default Dropdown;
