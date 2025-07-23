import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const proStatus = localStorage.getItem("isPro");
    setIsPro(proStatus === "true");

    const dummyUser = {
      name: "Sahil Rohilla",
      email: "sahil@example.com",
      id: "user123",
    };
    setUser(dummyUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, isPro }}>
      {children}
    </UserContext.Provider>
  );
};
