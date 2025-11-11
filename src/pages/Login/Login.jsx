import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { Bounce, toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false)

  const {auth, login} = use(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const provider = new GoogleAuthProvider()

  const handleLogin = (e) => {
    e.preventDefault()
    const Form = e.target
    const email = Form.email.value
    const password = Form.password.value

    login(email, password)
    .then(()=>{
      toast.success("Login Successfull",{
        position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
      })
      navigate(`${location.state ? location.state : "/"}`)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
      toast.error("Something went Wrong!", {
        position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
      })
    })
  }

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
        navigate(`${location.state ? location.state : "/"}`);
        toast.success("Login Successful", {
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
      const errorCode = error.code
      const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        toast.error("Something went Wrong", {
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
  }

  const togglePassword = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  return (
    <div className="mt-15 flex flex-col items-center py-7">
      <h1 className="mb-10">Login Now</h1>
      <form onSubmit={handleLogin}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">Email</label>
          <input name="email" type="email" className="input" placeholder="Email" required/>

          <label className="label">Password</label>
          <div className="relative">
            <input name="password" type={showPassword ? "text" : "password"} className="input" placeholder="Password" required/>

            <button onClick={togglePassword} className="absolute top-4 right-3 cursor-pointer">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button className="btn btn-neutral mt-4">Login</button>
          <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
          <p className="text-center">Don't have an account? <Link to={"/register"} className="text-blue-700">Register</Link></p>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
