import React from 'react';
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { ReactComponent as RightArrov } from "../assets/svg/keyboardArrowRightIcon.svg";


function ForgotPassword() {
  const  [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset email");
    }
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
          type="email"
          id="email"
          placeholder='Email'
          value={email}
          onChange={onChange}
          className="emailInput"
          />
          <Link className='forgotPasswordLink' to="/sign-in">Sign In</Link>
          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton"><RightArrov fill='white' width="34px" height="34px" /></button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
