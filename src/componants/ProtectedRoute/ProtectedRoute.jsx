import { Navigate } from "react-router-dom";
import { TokenContext } from "../../Context/Token.context";
import { useContext } from "react";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(TokenContext);
  if (token) {
    return children;
  } else {
    return <Navigate to={"/Login"} />;
  }
}
