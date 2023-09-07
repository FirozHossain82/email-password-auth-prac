import React, { useRef, useState } from "react";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../../firebase/firebase.config.js";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedSignIn = result.user;
        console.log(loggedSignIn);
        // setSuccess("User Login Successfully");
        toast.success("Login Successfully", {
          position: "top-center",
          autoClose: 500,
          theme: "dark",
        });
        setError("");
        event.target.reset();
      })
      .catch((error) => {
        setError(error.message);
        // console.log(error)
      });
  };

  const handleResetPassword = (event) => {
    const email = emailRef.current.value;
    if (!email) {
    //   alert("Please provide your email address to reset password");
    toast.warning('Please Provide Your Email Address to Reset Password',{
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
    })
    return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("Please Check your email", {
            position: "top-center",
            autoClose: 500,
            theme: "dark",
          });
          event.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <div className="bg-gray-200">
      <div className="py-10  flex items-center justify-center">
        <div className="bg-white p-8 rounded-md shadow-lg max-w-sm w-full">
          <h2 className="text-3xl font-serif font-semibold text-gray-800 mb-6 text-center">
            Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label for="email" className="text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                ref={emailRef}
                className="input input-bordered w-full mt-2"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                for="password"
                className="text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input input-bordered w-full mt-2"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="input input-primary w-5 h-5 mr-2"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <p className=" text-green-600 text-lg font-medium">{success}</p>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </form>
          <div>
            <p className="text-sm font-semibold text-orange-400">
              Forget Password? Please
              <button onClick={handleResetPassword} className="btn btn-link">
                Reset password
              </button>
            </p>
          </div>
          <p className="text-center mt-4">
            New Account Please?{" "}
            <Link
              className="text-orange-600 font-bold font-serif"
              to="/register_td"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;
