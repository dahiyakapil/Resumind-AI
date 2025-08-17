// import { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import { fetchCurrentUser } from "@/app/features/authSlice";

// export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const dispatch = useAppDispatch();
//   const { user, isLoading } = useAppSelector((state) => state.auth);

//   useEffect(() => {
//     // ✅ Only dispatch if not loading and user is still null
//     if (!user && !isLoading) {
//       dispatch(fetchCurrentUser());
//     }
//   }, [user, isLoading, dispatch]);

//   if (isLoading) return <div className="text-white">Loading...</div>;
//   if (!user) return <Navigate to="/auth" replace />;

//   return <>{children}</>;
// };

import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchCurrentUser } from "@/app/features/authSlice";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user && !isLoading) {
      dispatch(fetchCurrentUser());
    }
  }, [user, isLoading, dispatch]);

  if (isLoading)
    return <div className="text-white">Loading... Protected Route</div>;

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
