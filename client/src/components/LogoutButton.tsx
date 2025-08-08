// src/components/LogoutButton.tsx
import { useDispatch } from "react-redux";
import { logout } from "@/app/features/authSlice";
import { logoutUser } from "@/app/services/authApi";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigate("/auth");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button onClick={handleLogout} className="text-sm text-red-500">
      Logout
    </button>
  );
};

export default LogoutButton;
