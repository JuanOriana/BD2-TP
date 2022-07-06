import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import {ChakraProvider} from "@chakra-ui/react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EditUser from "./pages/EditUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import KeyRedirect from "./pages/KeyRedirect";
import AdminPanel from "./pages/AdminPanel";
import Error404 from "./pages/Error404";
import Layout from "./components/Layout/Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="signin" element={<SignIn/>}/>
            <Route path="signup" element={<SignUp/>}/>
            <Route path="edit-user" element={<EditUser/>}/>
            <Route path="admin" element={<AdminPanel/>}/>
            <Route path="link/:key" element={<KeyRedirect />} />
            <Route path="*" element={<Error404/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
