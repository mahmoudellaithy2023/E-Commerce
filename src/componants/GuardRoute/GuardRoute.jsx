import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { TokenContext } from "../../Context/Token.context";

export default function GuardRoute({ children }) {
  const { token, setToken } = useContext(TokenContext);

  if (token) {
    return <Navigate to={"/Home"} />;
  } else {
    return children;
  }
}
