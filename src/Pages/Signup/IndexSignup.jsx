import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { setUser } from "../../Redux/User/userSlice";
import Loader from "../Loader";
import { RegisterUserURL } from "../../BackendServerLinks";

const IndexSignup = () => {
  const dispatch = useDispatch();

  const { isLoading, isLoggedin, data, isError } = useSelector(
    (state) => state.user
  );

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState(false);

  const updateFullname = (e) => {
    setFullname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignupPostReq = async () => {
    try {
      setInternalLoading(true);
      setInternalError(null);
      const user = await axios.post(
        RegisterUserURL,
        { fullname, email, password },
        { withCredentials: true }
      );
      dispatch(setUser(user.data.user));
    } catch (error) {
      setInternalError(error.response?.data?.message || error.message);
    } finally {
      setInternalLoading(false);
    }
  };

  if(isLoading){
    return <Loader />
  }

  if (isLoggedin) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-900">
      <div className="p-16 bg-gray-600 flex flex-col gap-8 rounded-md">
        <input
          onChange={updateFullname}
          className="px-4 py-2 rounded-md outline-none"
          type="text"
          value={fullname}
          placeholder="fullname"
        />
        <input
          onChange={updateEmail}
          className="px-4 py-2 rounded-md outline-none"
          type="text"
          value={email}
          placeholder="email"
        />
        <input
          onChange={updatePassword}
          className="px-4 py-2 rounded-md outline-none" 
          type="password"
          value={password}
          placeholder="password"
        />
        {internalError && <h3 className="text-red-500 font-semibold">{internalError}</h3>}
        <button
          disabled={internalLoading}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
          onClick={handleSignupPostReq}
        >
          Signup
        </button>
        <h1 className="text-gray-200">Already have an account? <Link to={"/login"} className="text-white font-semibold hover:text-blue-500">Login</Link></h1>
      </div>
    </div>
  );
};

export default IndexSignup;
