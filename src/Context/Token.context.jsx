import { Children } from "react";
import { createContext, useState } from "react";

export const TokenContext = createContext(null);

export default function TokenProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  function exit() {
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <TokenContext.Provider value={{ token, setToken, exit }}>
      {children}
    </TokenContext.Provider>
  );
}
