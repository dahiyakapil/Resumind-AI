// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import type { RootState } from '../app/store';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const token = useSelector((state: RootState) => state.auth.token);

//   if (!token) {
//     return <Navigate to="/auth" replace />;
//   }

//   return <>{children}</>;
// };



// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import type { RootState } from "../app/store";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   if (!user) return <Navigate to="/auth" replace />;
//   return <>{children}</>;
// };


// // src/routes/ProtectedRoute.tsx
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { fetchCurrentUser } from "@/app/features/authSlice";
// import type { RootState } from "@/app/store";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const dispatch = useDispatch();
//   const { user, isLoading } = useSelector((state: RootState) => state.auth);
 

//   useEffect(() => {
//     if (!user) {
//       dispatch(fetchCurrentUser());
//     }
//   }, [user, dispatch]);

//   if (isLoading) return <div className="text-white">Loading...</div>;
//   if (!user) return <Navigate to="/auth" replace />;
//   return <>{children}</>;
// };


// src/routes/ProtectedRoute.tsx
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchCurrentUser } from "@/app/features/authSlice";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // ✅ Only dispatch if not loading and user is still null
    if (!user && !isLoading) {
      dispatch(fetchCurrentUser());
    }
  }, [user, isLoading, dispatch]);

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;

  return <>{children}</>;
};
