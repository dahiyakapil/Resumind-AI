// // src/layouts/DashboardLayout.tsx
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { FileText, History, LogOut, Moon, Rocket, Sun } from "lucide-react";
// import { logout } from "@/features/authSlice";
// import { useAppDispatch } from "@/hooks/redux";
// import { useTheme } from "@/hooks/useTheme";

// const DashboardLayout = () => {
//   const { theme, toggleTheme } = useTheme();
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/auth");
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 transition-colors duration-700 text-foreground">
//       {/* Sidebar */}
//       <aside className="w-64 min-h-screen border-r bg-white/10 dark:bg-white/5 backdrop-blur-lg p-5 flex flex-col justify-between">
//         {/* Logo + Nav */}
//         <div className="space-y-6">
//           <h2 className="text-2xl font-bold text-primary">📊 ResumeIq</h2>
//           <nav className="space-y-3">
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-primary text-white"
//                     : "text-muted-foreground hover:bg-primary/10"
//                 }`
//               }
//             >
//               <FileText className="w-4 h-4" />
//               Resume Analysis
//             </NavLink>
//             <NavLink
//               to="/history"
//               className={({ isActive }) =>
//                 `flex  items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-primary text-white"
//                     : "text-muted-foreground hover:bg-primary/10"
//                 }`
//               }
//             >
//               <History className="w-4 h-4" />
//               History
//             </NavLink>
//           </nav>
//         </div>

//         {/* Avatar + Logout */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <img
//               src="https://api.dicebear.com/7.x/initials/svg?seed=K"
//               alt="User"
//               className="w-10 h-10 rounded-full border"
//             />
//             <span className="text-sm font-medium">Kapil</span>
//           </div>
//           <Button variant="ghost" size="icon" onClick={handleLogout}>
//             <LogOut className="w-5 h-5 text-muted-foreground" />
//           </Button>
//         </div>
//       </aside>

//       {/* Right Section */}
//       <div className="flex-1 flex flex-col">
//         {/* Navbar */}
//         <header className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-white/10 dark:bg-black/10 backdrop-blur-lg">
//           <Button variant="default" className="flex items-center gap-2">
//             <Rocket className="w-4 h-4" />
//             Upgrade
//           </Button>

//           <Button variant="ghost" size="icon" onClick={toggleTheme}>
//             {theme === "dark" ? (
//               <Sun className="w-5 h-5" />
//             ) : (
//               <Moon className="w-5 h-5" />
//             )}
//           </Button>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 p-6 md:p-10 overflow-y-auto">
//           <div className="w-full max-w-7xl mx-auto bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 md:p-10 transition-all duration-700">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import {
//   FileText,
//   History,
//   LogOut,
//   Moon,
//   Rocket,
//   Settings,
//   Sun,

// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { logout } from "@/features/authSlice";
// import { useAppDispatch } from "@/hooks/redux";
// import { useTheme } from "@/hooks/useTheme";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const DashboardLayout = () => {
//   const { theme, toggleTheme } = useTheme();
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/auth");
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 transition-colors duration-700 text-foreground">
//       {/* Sidebar */}
//       <aside className="w-64 min-h-screen border-r bg-white/10 dark:bg-white/5 backdrop-blur-lg p-5 flex flex-col justify-between">
//         {/* Logo + Nav */}
//         <div className="space-y-6">
//           <h2 className="text-2xl font-bold text-primary">📊 ResumeIq</h2>
//           <nav className="space-y-3">
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-primary text-white"
//                     : "text-muted-foreground hover:bg-primary/10"
//                 }`
//               }
//             >
//               <FileText className="w-4 h-4" />
//               Resume Analysis
//             </NavLink>
//             <NavLink
//               to="/history"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-primary text-white"
//                     : "text-muted-foreground hover:bg-primary/10"
//                 }`
//               }
//             >
//               <History className="w-4 h-4" />
//               History
//             </NavLink>
//           </nav>
//         </div>

//         {/* User Dropdown Bottom Section */}
//         <div className="flex justify-between items-center">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <div className="flex items-center gap-2 cursor-pointer">
//                 <img
//                   src="https://api.dicebear.com/7.x/initials/svg?seed=K"
//                   alt="User"
//                   className="w-10 h-10 rounded-full border"
//                 />
//                 <span className="text-sm font-medium">Kapil</span>
//               </div>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-48" align="end">
//               <DropdownMenuItem onClick={() => navigate("/settings")}>
//                 <Settings className="mr-2 w-4 h-4" />
//                 Settings
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => navigate("/upgrade")}>
//                 <Rocket className="mr-2 w-4 h-4" />
//                 Upgrade
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={handleLogout}>
//                 <LogOut className="mr-2 w-4 h-4 text-destructive" />
//                 <span className="text-destructive">Logout</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </aside>

//       {/* Right Section */}
//       <div className="flex-1 flex flex-col">
//         {/* Navbar */}
//         <header className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-white/10 dark:bg-black/10 backdrop-blur-lg">
//           <Button variant="default" className="flex items-center gap-2">
//             <Rocket className="w-4 h-4" />
//             Upgrade
//           </Button>

//           <Button variant="ghost" size="icon" onClick={toggleTheme}>
//             {theme === "dark" ? (
//               <Sun className="w-5 h-5" />
//             ) : (
//               <Moon className="w-5 h-5" />
//             )}
//           </Button>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 p-6 md:p-10 overflow-y-auto">
//           <div className="w-full max-w-7xl mx-auto bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 md:p-10 transition-all duration-700">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

// import {
//   FileText,
//   History,
//   LogOut,
//   Moon,
//   Rocket,
//   Settings,
//   Sun,

// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useAppDispatch } from "@/hooks/redux";

// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useTheme } from "@/hooks/useTheme";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Link } from "react-router-dom";
// import { logoutUser } from "@/app/services/authApi"; // ✅ import the API
// import { logout as logoutRedux } from "@/app/features/authSlice"; // ✅ import reducer
// import { toast } from "sonner";

// const DashboardLayout = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { theme, toggleTheme } = useTheme();

// const handleLogout = async () => {
//   try {
//     await logoutUser(); // 👈 Call backend

//     dispatch(logoutRedux());  // 👈 Clear auth state
//     localStorage.clear();     // 👈 Clear persisted session
//     navigate("/auth");        // 👈 Redirect
//   } catch (err) {
//     console.error("Logout failed", err);
//     toast.error("Logout failed. Try again.");
//   }
// };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 transition-colors duration-700 text-foreground">
//       {/* Sidebar */}
//       <aside className="w-64 min-h-screen border-r bg-white/10 dark:bg-white/5 backdrop-blur-lg p-5 flex flex-col">
//         {/* Logo + Nav */}
//         <div className="space-y-6">
//           <Link to="/">
//             <div>
//               <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
//                 ResumeIQ
//               </h2>
//             </div>
//           </Link>
//           <nav className="space-y-3">
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-primary text-white"
//                     : "text-muted-foreground hover:bg-primary/10"
//                 }`
//               }
//             >
//               <FileText className="w-4 h-4" />
//               Resume Analysis
//             </NavLink>
//             <NavLink
//               to="/history"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-primary text-white"
//                     : "text-muted-foreground hover:bg-primary/10"
//                 }`
//               }
//             >
//               <History className="w-4 h-4" />
//               History
//             </NavLink>

//             <NavLink
//               to="/rewrite-suggestion"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-primary text-white"
//                     : "text-muted-foreground hover:bg-primary/10"
//                 }`
//               }
//             >
//               <History className="w-4 h-4" />
//               AI Suggestion
//             </NavLink>
//           </nav>
//         </div>

//         {/* Sticky Avatar + Dropdown */}
//         <div className="mt-auto pt-6">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <div className="flex items-center gap-2 cursor-pointer hover:bg-muted/20 p-2 rounded-md transition">
//                 <img
//                   src="https://api.dicebear.com/7.x/initials/svg?seed=K"
//                   alt="User"
//                   className="w-10 h-10 rounded-full border"
//                 />
//                 <span className="text-sm font-medium">Kapil</span>
//               </div>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-48">
//               <DropdownMenuItem onClick={() => navigate("/settings")}>
//                 <Settings className="mr-2 w-4 h-4" />
//                 Settings
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => navigate("/upgrade")}>
//                 <Rocket className="mr-2 w-4 h-4" />
//                 Upgrade
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={handleLogout}>
//                 <LogOut className="mr-2 w-4 h-4 text-destructive" />
//                 <span className="text-destructive">Logout</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </aside>

//       {/* Main Layout */}
//       <div className="flex-1 flex flex-col">
//         {/* Top Navbar */}
//         <header className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-white/10 dark:bg-black/10 backdrop-blur-lg">
//           <Button variant="default" className="flex items-center gap-2">
//             <Rocket className="w-4 h-4" />
//             Upgrade
//           </Button>

//           <Button variant="ghost" size="icon" onClick={toggleTheme}>
//             {theme === "dark" ? (
//               <Sun className="w-5 h-5" />
//             ) : (
//               <Moon className="w-5 h-5" />
//             )}
//           </Button>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 p-6 md:p-10 overflow-y-auto">
//           <div className="w-full max-w-7xl mx-auto bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 md:p-10 transition-all duration-700">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

// import {
//   FileText,
//   History,
//   LogOut,
//   Moon,
//   Rocket,
//   Settings,
//   Sun,
//   Sparkles 
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useTheme } from "@/hooks/useTheme";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Link } from "react-router-dom";
// import { logoutUser } from "@/app/services/authApi"; // ✅ Backend API call
// import { logout as logoutRedux } from "@/app/features/authSlice"; // ✅ Redux action
// import { toast } from "sonner";

// const DashboardLayout = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { theme, toggleTheme } = useTheme();
//   const user = useAppSelector((state) => state.auth.user); // ✅ Redux user

//   const handleLogout = async () => {
//     try {
//       await logoutUser(); // API call
//       dispatch(logoutRedux()); // Clear Redux
//       localStorage.clear(); // Clear localStorage
//       navigate("/auth"); // Redirect to login
//     } catch (err) {
//       console.error("Logout failed", err);
//       toast.error("Logout failed. Try again.");
//     }
//   };

//   const userName = user?.firstName ?? "User";
//   const avatarSeed = userName?.[0] ?? "U";

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 transition-colors duration-700 text-foreground">
//       {/* Sidebar */}
//       <aside className="w-64 sticky top-0 h-screen border-r bg-white/10 dark:bg-white/5 backdrop-blur-lg p-5 flex flex-col z-40">
//         {/* Logo + Nav */}
//         <div className="space-y-6">
//           <Link to="/">
//             <div>
//               <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
//                 ResumeIQ
//               </h2>
//             </div>
//           </Link>
//           <nav className="space-y-3">
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-white text-black dark:bg-white dark:text-black shadow-sm"
//                     : "text-muted-foreground hover:bg-primary/10"
//                 }`
//               }
//             >
//               <FileText className="w-4 h-4" />
//               Resume Analysis
//             </NavLink>
//             <NavLink
//               to="/history"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-white text-black dark:bg-white dark:text-black shadow-sm"
//                     : "text-muted-foreground hover:bg-primary/10"
//                 }`
//               }
//             >
//               <History className="w-4 h-4" />
//               History
//             </NavLink>
//             <NavLink
//               to="/rewrite-suggestion"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-white text-black dark:bg-white dark:text-black shadow-sm"
//                     : "text-muted-foreground hover:bg-primary/10"
//                 }`
//               }
//             >
//               <Sparkles className="w-4 h-4" />
//               AI Suggestion
//             </NavLink>
//           </nav>
//         </div>

//         {/* Sticky Avatar + Dropdown */}
//         <div className="mt-auto pt-6">
//           <DropdownMenu>

            
//             <DropdownMenuTrigger asChild>
//               <div className="flex items-center gap-2 cursor-pointer hover:bg-muted/20 p-2 rounded-md transition">
//                 <img
//                   src={`https://api.dicebear.com/7.x/initials/svg?seed=${avatarSeed}`}
//                   alt={userName}
//                   className="w-10 h-10 rounded-full border"
//                 />
//                 <span className="text-sm font-medium">{userName}</span>
//               </div>
//             </DropdownMenuTrigger>





//             <DropdownMenuContent align="end" className="w-48">
//               <DropdownMenuItem onClick={() => navigate("/settings")}>
//                 <Settings className="mr-2 w-4 h-4" />
//                 Settings
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => navigate("/upgrade")}>
//                 <Rocket className="mr-2 w-4 h-4" />
//                 Upgrade
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={handleLogout}>
//                 <LogOut className="mr-2 w-4 h-4 text-destructive" />
//                 <span className="text-destructive">Logout</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </aside>

//       {/* Main Layout */}
//       <div className="flex-1 flex flex-col">
//         {/* Top Navbar */}
//         <header className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-white/10 dark:bg-black/10 backdrop-blur-lg">
//           <Button variant="default" className="flex items-center gap-2">
//             <Rocket className="w-4 h-4" />
//             Upgrade
//           </Button>

//           <Button variant="ghost" size="icon" onClick={toggleTheme}>
//             {theme === "dark" ? (
//               <Sun className="w-5 h-5" />
//             ) : (
//               <Moon className="w-5 h-5" />
//             )}
//           </Button>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 p-6 md:p-10 overflow-y-auto">
//           <div className="w-full max-w-7xl mx-auto bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 md:p-10 transition-all duration-700">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;




// src/layouts/DashboardLayout.tsx


// import {
//   FileText,
//   History,
//   LogOut,
//   Moon,
//   Rocket,
//   Settings,
//   Sun,
//   Sparkles,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useTheme } from "@/hooks/useTheme";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Link } from "react-router-dom";
// import { logoutUser } from "@/app/services/authApi";
// import { logout as logoutRedux } from "@/app/features/authSlice";
// import { toast } from "sonner";

// const DashboardLayout = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { theme, toggleTheme } = useTheme();
//   const user = useAppSelector((state) => state.auth.user);

//   const userName = user?.firstName ?? "User";
//   const avatarSeed = userName || "U";
//   const avatarStyle = "adventurer-neutral";
//   const avatarUrl = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`;

//   const handleLogout = async () => {
//     try {
//       await logoutUser();
//       dispatch(logoutRedux());
//       localStorage.clear();
//       navigate("/auth");
//     } catch (err) {
//       console.error("Logout failed", err);
//       toast.error("Logout failed. Try again.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 transition-colors duration-700 text-foreground">
//       {/* Sidebar */}
//       <aside className="w-64 sticky top-0 h-screen border-r bg-white/10 dark:bg-white/5 backdrop-blur-lg p-5 flex flex-col z-40">
//         {/* Logo + Nav */}
//         <div className="space-y-6">
//           <Link to="/">
//             <div>
//               <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
//                 ResumeIQ
//               </h2>
//             </div>
//           </Link>
//           <nav className="space-y-3">
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-white text-black dark:bg-white dark:text-black shadow-sm"
//                     : "text-muted-foreground hover:bg-primary/10"
//                 }`
//               }
//             >
//               <FileText className="w-4 h-4" />
//               Resume Analysis
//             </NavLink>
//             <NavLink
//               to="/history"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-white text-black dark:bg-white dark:text-black shadow-sm"
//                     : "text-muted-foreground hover:bg-primary/10"
//                 }`
//               }
//             >
//               <History className="w-4 h-4" />
//               History
//             </NavLink>
//             <NavLink
//               to="/rewrite-suggestion"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-white text-black dark:bg-white dark:text-black shadow-sm"
//                     : "text-muted-foreground hover:bg-primary/10"
//                 }`
//               }
//             >
//               <Sparkles className="w-4 h-4" />
//               AI Suggestion
//             </NavLink>
//           </nav>
//         </div>

//         {/* Sticky Avatar + Dropdown */}
//         <div className="mt-auto pt-6">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <div className="flex items-center gap-2 cursor-pointer hover:bg-muted/20 p-2 rounded-md transition">
//                 <img
//                   src={avatarUrl}
//                   alt={userName}
//                   className="w-10 h-10 rounded-full border"
//                 />
//                 <span className="text-sm font-medium">{userName}</span>
//               </div>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-48">
//               <DropdownMenuItem onClick={() => navigate("/settings")}>
//                 <Settings className="mr-2 w-4 h-4" />
//                 Settings
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => navigate("/upgrade")}>
//                 <Rocket className="mr-2 w-4 h-4" />
//                 Upgrade
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={handleLogout}>
//                 <LogOut className="mr-2 w-4 h-4 text-destructive" />
//                 <span className="text-destructive">Logout</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </aside>

//       {/* Main Layout */}
//       <div className="flex-1 flex flex-col">
//         {/* Top Navbar */}
//         <header className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-white/10 dark:bg-black/10 backdrop-blur-lg">
//           <Button variant="default" className="flex items-center gap-2">
//             <Rocket className="w-4 h-4" />
//             Upgrade
//           </Button>

//           <Button variant="ghost" size="icon" onClick={toggleTheme}>
//             {theme === "dark" ? (
//               <Sun className="w-5 h-5" />
//             ) : (
//               <Moon className="w-5 h-5" />
//             )}
//           </Button>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 p-6 md:p-10 overflow-y-auto">
//           <div className="w-full max-w-7xl mx-auto bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 md:p-10 transition-all duration-700">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;



import {
  FileText,
  History,
  LogOut,
  Moon,
  Rocket,
  Settings,
  Sun,
  Sparkles,
  Link2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { logoutUser } from "@/app/services/authApi";
import { logout as logoutRedux } from "@/app/features/authSlice";
import { toast } from "sonner";

const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const user = useAppSelector((state) => state.auth.user);

  const userName = user?.firstName ?? "User";
  const avatarSeed = user?.firstName || "User";
  const avatarStyle = user?.avatar || "micah"; // ✅ dynamic from Redux
  const avatarUrl = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`;

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logoutRedux());
      localStorage.clear();
      navigate("/auth");
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 transition-colors duration-700 text-foreground">
      {/* Sidebar */}
      <aside className="w-64 sticky top-0 h-screen border-r bg-white/10 dark:bg-white/5 backdrop-blur-lg p-5 flex flex-col z-40">
        <div className="space-y-6">
          <Link to="/">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              ResumeIQ
            </h2>
          </Link>
          <nav className="space-y-3">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-black dark:bg-white dark:text-black shadow-sm"
                    : "text-muted-foreground hover:bg-primary/10"
                }`
              }
            >
              <FileText className="w-4 h-4" />
              Resume Analysis
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-black dark:bg-white dark:text-black shadow-sm"
                    : "text-muted-foreground hover:bg-primary/10"
                }`
              }
            >
              <History className="w-4 h-4" />
              History
            </NavLink>
            <NavLink
              to="/rewrite-suggestion"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-black dark:bg-white dark:text-black shadow-sm"
                    : "text-muted-foreground hover:bg-primary/10"
                }`
              }
            >
              <Sparkles className="w-4 h-4" />
              AI Suggestion
            </NavLink>
            <NavLink
              to="/job-match"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-black dark:bg-white dark:text-black shadow-sm"
                    : "text-muted-foreground hover:bg-primary/10"
                }`
              }
            >
              <Link2Icon className="w-4 h-4" />
              Job Match
            </NavLink>
          </nav>
        </div>

        {/* Avatar + Dropdown */}
        <div className="mt-auto pt-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer hover:bg-muted/20 p-2 rounded-md transition">
                <img
                  src={avatarUrl}
                  alt={userName}
                  className="w-10 h-10 rounded-full border"
                />
                <span className="text-sm font-medium">{userName}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 w-4 h-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/upgrade")}>
                <Rocket className="mr-2 w-4 h-4" />
                Upgrade
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 w-4 h-4 text-destructive" />
                <span className="text-destructive">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-white/10 dark:bg-black/10 backdrop-blur-lg">
          <Button variant="default" className="flex items-center gap-2">
            <Rocket className="w-4 h-4" />
            Upgrade
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </header>

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 md:p-10 transition-all duration-700">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
