import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomeFork from "./pages/HomeFork";
import { ChakraProvider } from "@chakra-ui/react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EditUser from "./pages/EditUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import KeyRedirect from "./pages/KeyRedirect";
import AdminPanel from "./pages/Admin/AdminPanel";
import Error404 from "./pages/Error404";
import Layout from "./components/Layout/Layout";
import Plans from "./pages/Admin/Plans";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/RequireAuth";

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
              <Route path="edit-user" element={<EditUser />} />
              <Route path="admin" element={<AdminPanel />} />
              <Route path="admin/plans" element={<Plans />} />
            </Route>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="link/:key" element={<KeyRedirect />} />
            <Route
              path="*"
              element={
                <Layout>
                  <Error404 />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
