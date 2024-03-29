import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomeFork from "./pages/HomeFork";
import { ChakraProvider } from "@chakra-ui/react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import KeyRedirect from "./pages/KeyRedirect";
import AdminPanel from "./pages/Admin/AdminPanel";
import Error404 from "./pages/Error404";
import Layout from "./components/Layout/Layout";
import Plans from "./pages/Admin/Plans";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/RequireAuth";
import Users from "./pages/Admin/Users";
import Links from "./pages/Admin/Links";
import Nav from "./components/Nav/Nav";
import Error from "./pages/Error";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Layout />
                </RequireAuth>
              }
            >
              <Route index element={<HomeFork />} />
              <Route path="home" element={<HomeFork />} />
              <Route path="admin" element={<AdminPanel />} />
              <Route path="admin/plans" element={<Plans />} />
              <Route path="admin/users" element={<Users />} />
              <Route path="admin/links" element={<Links />} />
            </Route>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="link/:key" element={<KeyRedirect />} />
            <Route
              path="error"
              element={
                <>
                  <Nav />
                  <Error />
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <Nav />
                  <Error404 />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
