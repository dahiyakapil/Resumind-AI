import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "@/app/services/authApi";
import { setCredentials } from "@/app/features/authSlice";
import { Outlet } from "react-router-dom";

export const AuthProvider = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getCurrentUser();
        dispatch(setCredentials({ user: response.user }));
      } catch (err) {
        // User not logged in or error in auth/me
        console.log("No user session found", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [dispatch]);

  if (loading) return <div className="text-center py-12 text-muted">Loading...</div>;

  return <Outlet />; // or return children if using layout
};

