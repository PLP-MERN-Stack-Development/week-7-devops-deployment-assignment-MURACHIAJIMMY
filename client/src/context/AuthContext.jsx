// import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
//  import useAuth from "@/hooks/useAuth";
// import { AuthContext } from "@/context/auth-context";
// import { ThemeContext } from "@/context/theme-context";


// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
//   const navigate = useNavigate();

//   const login = ({ token, user }) => {
//     setToken(token);
//     setUser(user);
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//     navigate("/dashboard");
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  const login = ({ token, user }) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

