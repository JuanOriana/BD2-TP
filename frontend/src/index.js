import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EditUser from "./pages/EditUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import KeyRedirect from "./pages/KeyRedirect";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="edit-user" element={<EditUser />} />
          <Route path="link/:key" element={<KeyRedirect />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
