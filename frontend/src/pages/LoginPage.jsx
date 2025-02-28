import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from './../context/UserContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {loginUser}=useContext(UserContext);
  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(formData);
    setFormData({ email: "", password: "" });
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50  overflow-y-hidden">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row">
        {/* Left image - hidden on small screens */}
        <div className="lg:w-1/2 lg:block hidden">
          <img
            src="https://images.unsplash.com/photo-1620336655055-088d06e36bf0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29taWN8ZW58MHx8MHx8fDA%3D"
            alt="Login"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        {/* Right form */}
        <div className="flex flex-col px-12 py-10 lg:w-1/2">
          <h1 className="text-2xl font-bold mb-4">Login to your account</h1>
          <p className="text-xs text-gray-700 mb-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold underline cursor-pointer"
            >
              Sign up
            </Link>
          </p>
          <form
            onSubmit={submitHandler}
            className="flex flex-col text-gray-600 py-4 space-y-4"
          >
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
            <div className="mt-5">
              <p className="text-xs">
                <span className="font-bold underline cursor-pointer">
                  Forgot password?
                </span>
              </p>
            </div>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-gray-400 mt-6 text-lg text-white cursor-pointer hover:bg-gray-500 transition"
            >
              Login
            </button>
            <p className="py-4 text-center text-xs">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold underline cursor-pointer"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
