// AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userID, setUserId] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const userData = JSON.parse(jsonPayload);
      setUserId(userData.id); // Set userId in context
    }
  }, []);

  return (
    <UserContext.Provider value={{ userID, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserId = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserId must be used within a UserProvider");
  }
  return context;
};
