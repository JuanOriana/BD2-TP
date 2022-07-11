import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Home from "./Home";
import PublicHome from "./PublicHome";
const HomeFork = () => {
  const { user } = useAuth();
  if (user) return <Home />;
  return <PublicHome />;
};

export default HomeFork;
