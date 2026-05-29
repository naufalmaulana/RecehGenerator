import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireUser?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false, requireUser = false }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /signin page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (requireAdmin && user?.role !== 'ADMIN') {
    return <Navigate to="/home" replace />;
  }

  if (requireUser && user?.role === 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
