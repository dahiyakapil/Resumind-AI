// src/pages/OAuthRedirect.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/app/services/authApi";
import { useAppDispatch } from "@/hooks/redux";
import { setCredentials } from "@/app/features/authSlice";
import { toast } from "sonner";

export const OAuthRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await getCurrentUser();
        dispatch(setCredentials({ user: response.user }));
        toast.success("Logged in via OAuth!");
        navigate("/dashboard");
      } catch (err) {
        toast.error("OAuth login failed. Please try again.");
        navigate("/auth");
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p className="text-lg">Finalizing login...</p>
    </div>
  );
};
