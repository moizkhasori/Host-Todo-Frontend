import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Header from "./Header";

const ProtectedRoute = ({ children }) => {
  // const navigate = useNavigate()
  const dispatch = useDispatch();
  const selecter = useSelector((state) => state.user);
  // console.log(selecter);
  const { isLoading, isLoggedin, data, isError } = useSelector(
    (state) => state.user
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoggedin) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <Header />

      <Outlet>{children}</Outlet>
    </div>
  );
};

export default ProtectedRoute;
