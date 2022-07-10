import React, { createContext, useState } from "react";
import { internalAuthProvider } from "../scripts/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  let [user, setUser] = useState(null);

  let signin = (newUser, callback) => {
    return internalAuthProvider.signin(() => {
      setUser(newUser);
      if (!localStorage.getItem("user"))
        localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("token", newUser.token);
      localStorage.setItem("isAdmin", newUser.admin ? "true" : "false");
      callback();
    });
  };

  let signout = (callback) => {
    return internalAuthProvider.signout(() => {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      callback();
    });
  };

  let value = { user, setUser, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
