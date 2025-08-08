import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout } from "@/app/features/authSlice";
import { getCurrentUser } from "@/app/services/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import type { RootState } from "@/app/store"; // ✅ Update with your actual store path

export function useSession() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loading = useSelector((state: RootState) => state.auth.isLoading);

  useEffect(() => {
    (async () => {
      try {
        const response = await getCurrentUser();
        dispatch(setCredentials({ user: response.user }));
      } catch (err) {
        dispatch(logout());
        if (location.pathname.startsWith("/dashboard")) {
          navigate("/auth");
        }
        console.error(err);
      }
    })();
  }, []);

  return { loading }; // ✅ FIX: return the loading state
}
