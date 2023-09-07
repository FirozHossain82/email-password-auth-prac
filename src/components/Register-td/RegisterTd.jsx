import React, { useState } from "react";
import img from "../../assets/login.svg";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import app from "../../firebase/firebase.config.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const auth = getAuth(app);

const RegisterTd = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');




     const handleSignUp = (event) =>{
           // 1. prevent page refresh
        event.preventDefault();
        setSuccess('');
        setError('');
        // 2. collect form data
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(name,email,password);

        //validate
        if(!/(?=.*[A-Z])/.test(password)){
            setError('Please add at least one Uppercase Letter');
            return;
        }
        else if(!/(?=.*[!@#$&*])/.test(password)){
            setError('Please one special letter');
            return;
        }
        else if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setError('Please add at least two numbers');
            return;
        }
        else if(password.length<6){
            setError('Please add at least 6 character in your password');
            return;
        }
        // create user in firebase
        createUserWithEmailAndPassword(auth,email,password)
        .then((result) =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('');
            event.target.reset();
            // setSuccess('User has been created  successfully')
            toast.success("User has been created  successfully", {
                position: "top-center",
                autoClose: 1000,
                theme: "dark",
              });
            sendVerificationEmail(result.user);
            updateUserData(result.user, name);
        })
        .catch((error) =>{
            console.log(error.message);
            setError(error.message);
            // setSuccess('');
        })
     }

     const sendVerificationEmail = (user) =>{
            sendEmailVerification(user)
            .then((result) =>{
                console.log(result);
                // alert('Please Verify Your email address')
                toast.info("Please Verify Your email address", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "dark",
                  });
            })
     }

     const updateUserData = (user, name) =>{
        updateProfile(user, {
            displayName:name
        })
        .then(() =>{
            console.log('User Name Updated')
        })
        .catch((error) =>{
            setError(error.message)
        })
     }

  return (
    <div>
      <div className="hero w-full py-10 bg-lime-50">
        <div className="hero-content grid gap-20 lg:grid-cols-2 md:grid-cols-2 flex-col lg:flex-row ">
          <div className="text-center lg:text-left">
            <img className="w-3/4" src={img} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-14">
            <h1 className="text-5xl text-center font-bold ">Sign Up</h1>
            <form onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <p className="text-base text-red-600 font-medium">{error}</p>
                <p className="text-base text-green-600 font-medium">{success}</p>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-outline btn-secondary"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <p className="text-center">
              Already have an account?{" "}
              <Link className="text-orange-600 font-bold" to="/login">
                Login
              </Link>{" "}
            </p>
            {/* <SocialLogin></SocialLogin> */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterTd;
