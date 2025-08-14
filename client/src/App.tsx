// import { Routes, Route, useNavigate } from "react-router-dom";
// // import AuthPage from "./pages/AuthPage";
// import Dashboard from "./pages/Dashboard";
// import HistoryPage from "./pages/HistoryPage";
// import { ProtectedRoute } from "./components/ProtectedRoute";
// import { Toaster } from "sonner";
// import { HomePage } from "./pages/HomePage";
// import { ThemeProvider } from "./components/contexts/ThemeContext";
// import { OAuthRedirect } from "./pages/OAuthRedirect";
// import DashboardLayout from "./pages/DashboardLayout";
// import { RewriteBulletPointsPage } from "./pages/RewriteBulletPointsPage";
// import SettingsPage from "./pages/SettingsPage";
// import JobMatch from "./pages/JobMatch";
// import SignupPage from "./pages/SignupPage";
// import VerifyOtpPage from "./pages/VerifyOtpPage";
// import LoginPage from "./pages/loginPage";

//   const handleAuthNavigate = (mode: "login" | "signup") => {
//     if (mode === "login") {
//       navigate("/login");
//     } else if (mode === "signup") {
//       navigate("/signup");
//     }
//   };

// function App() {
//   const navigate = useNavigate();
//   return (
//     <ThemeProvider>
//       <Toaster richColors position="bottom-right" />

//       <Routes>
//         <Route
//           path="/"
//           element={<HomePage onAuthNavigate={() => navigate("/login")} />}
//         />
//         {/* <Route path="/auth" element={<AuthPage />} /> */}

//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/verify-otp" element={<VerifyOtpPage />} />
//         <Route path="/login" element={<LoginPage />} />

//         {/* ✅ Dashboard Layout with Protected Routes */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <DashboardLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="history" element={<HistoryPage />} />
//           <Route path="/rewrite-suggestion" element={<RewriteBulletPointsPage />} />
//           <Route path="/settings" element={<SettingsPage />} />
//           <Route path="/job-match" element={<JobMatch />} />

//         </Route>
//       </Routes>
//     </ThemeProvider>
//   );
// }

// export default App;

// import { useNavigate, Routes, Route } from "react-router-dom";
// import Navbar from "@/components/DashboardNavbar"; // Import your Navbar component
// import { ProtectedRoute } from "./components/ProtectedRoute";
// import DashboardLayout from "./pages/DashboardLayout";
// import LoginPage from "./pages/loginPage";
// import VerifyOtpPage from "./pages/VerifyOtpPage";
// import SignupPage from "./pages/SignupPage";
// import { HomePage } from "./pages/HomePage";
// import { ThemeProvider } from "next-themes";
// import { Toaster } from "sonner";
// import Dashboard from "./pages/Dashboard";
// import HistoryPage from "./pages/HistoryPage";
// import { RewriteBulletPointsPage } from "./pages/RewriteBulletPointsPage";
// import SettingsPage from "./pages/SettingsPage";
// import JobMatch from "./pages/JobMatch";

// function App() {
//   const navigate = useNavigate();

//   // Handle navigation from auth buttons
//   const handleAuthNavigate = (mode: "login" | "signup") => {
//     if (mode === "login") {
//       navigate("/login");
//     } else if (mode === "signup") {
//       navigate("/signup");
//     }
//   };

//   return (
//     <ThemeProvider>
//       <Toaster richColors position="bottom-right" />

//       {/* Pass the handler to Navbar so sign in/up buttons work globally */}
//       <Navbar onAuthNavigate={handleAuthNavigate} onScrollTo={(id) => {/* your scroll logic here */}} />

//       <Routes>
//         <Route
//           path="/"
//           element={<HomePage onAuthNavigate={handleAuthNavigate} />}
//         />

//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/verify-otp" element={<VerifyOtpPage />} />
//         <Route path="/login" element={<LoginPage />} />

//         {/* Protected Routes */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <DashboardLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="history" element={<HistoryPage />} />
//           <Route path="rewrite-suggestion" element={<RewriteBulletPointsPage />} />
//           <Route path="settings" element={<SettingsPage />} />
//           <Route path="job-match" element={<JobMatch />} />
//         </Route>
//       </Routes>
//     </ThemeProvider>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import { Toaster } from "sonner";
import { HomePage } from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import LoginPage from "./pages/loginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import HistoryPage from "./pages/HistoryPage";
import { RewriteBulletPointsPage } from "./pages/RewriteBulletPointsPage";
import SettingsPage from "./pages/SettingsPage";
import JobMatch from "./pages/JobMatch";
import { fetchCurrentUser } from "./app/features/authSlice";
import { useAppDispatch } from "./hooks/redux";

function App() {

  const dispatch = useAppDispatch();
  

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  


  return (
    <ThemeProvider>
      <Toaster richColors position="bottom-right" />

      {/* Pass only the scroll handler */}

      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
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
          <Route
            path="rewrite-suggestion"
            element={<RewriteBulletPointsPage />}
          />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="job-match" element={<JobMatch />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
