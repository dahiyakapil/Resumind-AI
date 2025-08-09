
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import HistoryPage from "./pages/HistoryPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Toaster } from "sonner";
import { HomePage } from "./pages/HomePage";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import { OAuthRedirect } from "./pages/OAuthRedirect";
import DashboardLayout from "./pages/DashboardLayout";
import { RewriteBulletPointsPage } from "./pages/RewriteBulletPointsPage";
import SettingsPage from "./pages/SettingsPage";
import JobMatch from "./pages/JobMatch";




function App() {
  const navigate = useNavigate();
  return (
    <ThemeProvider>
      <Toaster richColors position="bottom-right" />
      <Routes>
        <Route
          path="/"
          element={<HomePage onAuthNavigate={() => navigate("/auth")} />}
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/oauth-redirect" element={<OAuthRedirect />} />

        {/* ✅ Dashboard Layout with Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="/rewrite-suggestion" element={<RewriteBulletPointsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/job-match" element={<JobMatch />} />
          
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
