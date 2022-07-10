import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Home from "./Home";
const HomeFork = () => {
  const { user } = useAuth();
  if (user) return <Home />;
  return <p>no user</p>;
};

export default HomeFork;
