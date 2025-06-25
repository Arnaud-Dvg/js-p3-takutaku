// src/components/PrivateRoute.tsx
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { connected, loading } = useUserContext();

  if (loading) {
    return null;
  }
  if (!connected) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
