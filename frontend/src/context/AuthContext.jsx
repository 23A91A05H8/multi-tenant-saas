import { createContext, useContext, useState, useEffect } from "react";
import { clearToken } from "../utils/token";
import api from "../api/axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);


useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser && storedUser !== "undefined") {
    try {
      setUser(JSON.parse(storedUser));
    } catch {
      localStorage.clear();
      setUser(null);
    }
  } else {
    setUser(null);
  }
}, []);


 const loginUser = (data) => {
  if (!data?.token || !data?.user) {
    console.error("Invalid login payload", data);
    return;
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  setUser(data.user);
};


  const logoutUser = () => {
    setUser(null);
    localStorage.clear();
    clearToken();
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
