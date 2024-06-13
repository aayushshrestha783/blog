// AuthContext.js
import { createContext, useState, useContext } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userID, setUserId] = useState(null);

  const setAuthenticatedUser = (id) => {
    setUserId(id);
  };

  return (
    <UserContext.Provider value={{ userID, setUserId: setAuthenticatedUser }}>
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
