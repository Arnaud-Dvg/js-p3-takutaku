// src/components/PrivateRoute.tsx
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { useUserContext } from "../../../context/UserContext";

type PrivateRouteProps = {
  children: JSX.Element;
  adminOnly?: boolean;
};

function PrivateRoute({ children, adminOnly = false }: PrivateRouteProps) {
  const { connected, loading } = useAuthContext();
  const { user } = useUserContext();

  if (loading) return null;

  if (!connected) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !user?.is_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
