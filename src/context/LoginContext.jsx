import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [userPhone, setUserPhone] = useState("");

  useEffect(() => {
    const phone = localStorage.getItem("userPhone");
    if (phone) {
      setUserPhone(phone);
    }
  }, []);

  return (
    <LoginContext.Provider value={{ userPhone, setUserPhone }}>
      {children}
    </LoginContext.Provider>
  );
};
