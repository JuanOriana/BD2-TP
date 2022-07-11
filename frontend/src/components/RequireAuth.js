import { useAuth } from "../contexts/AuthContext";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

function RequireAuth({ children }) {
  const { user, signin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const readUser = localStorage.getItem("user");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const rememberMe = localStorage.getItem("rememberMe") === "true";
  useEffect(() => {
    if (readUser && readUser !== "")
      signin(JSON.parse(readUser), rememberMe, () => navigate(location));
  }, []);
  console.log(user);
  if (!user && !readUser && location.pathname != "/") {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
