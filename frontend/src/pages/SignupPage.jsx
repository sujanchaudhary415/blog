import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const SignupPage = () => {
  const { user,registerUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const submitHandler = (e) => {
   e.preventDefault();
   registerUser(formData);
   setFormData({ name: "", email: "", password: "" });
  }
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 overflow-y-hidden">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row">
        {/* Left image - hidden on small screens */}
        <div className="lg:w-1/2 lg:block hidden">
          <img
            src="https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNwaWRlcm1hbnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Signup"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        {/* Right form */}
        <div className="flex flex-col px-12 py-10 lg:w-1/2">
          <h1 className="text-2xl font-bold mb-4">Create an account</h1>
          <p className="text-xs text-gray-700 mb-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold underline cursor-pointer"
            >
              Login
            </Link>
          </p>
          <form onSubmit={submitHandler} className="flex flex-col text-gray-600 py-4 space-y-4">
            <label htmlFor="Username" className="text-sm">
              User name
            </label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              type="text"
              id="Username"
              className="border rounded border-gray-500 px-3 py-2 outline-0 focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="email" className="text-sm">
              Email address
            </label>
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              id="email"
              className="border rounded border-gray-500 px-3 py-2 outline-0 focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
              id="password"
              className="border rounded border-gray-500 px-3 py-2 outline-0 focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs mt-1">Use 6 or more characters</p>
            <div className="mt-5">
              <p className="text-xs">
                By creating an account, you agree to our
              </p>
              <p className="text-sm">
                <span className="font-bold underline">Terms of use</span> and{" "}
                <span className="font-bold underline">Privacy Policy</span>
              </p>
            </div>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-gray-400 mt-6 text-lg text-white cursor-pointer hover:bg-gray-500 transition"
            >
              Create an account
            </button>
            <p className="py-4 text-center text-xs">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold underline cursor-pointer"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
