
// import React, { useCallback, useState } from "react";
// import { motion } from "framer-motion";
// import { useAppDispatch } from "@/hooks/redux";
// import { setCredentials } from "@/app//features/authSlice";
// import { signin, signup} from "@/app/services/authApi";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// // import { FaGoogle, FaGithub } from "react-icons/fa";
// import { FiMail, FiLock, FiEye } from "react-icons/fi";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
// import type { SignInFormData, SignUpFormData } from "@/lib/validationSchemas";
// import { schemaSignIn, schemaSignUp } from "@/lib/validationSchemas";

// interface AuthFormProps {
//   isSignIn: boolean;
// }

// export const AuthForm: React.FC<AuthFormProps> = ({ isSignIn }) => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const [submitting, setSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignInFormData | SignUpFormData>({
//     resolver: zodResolver(isSignIn ? schemaSignIn : schemaSignUp),
//     mode: "onTouched",
//   });

//   const onSubmit = useCallback(
//     async (data: SignInFormData | SignUpFormData) => {
//       if (submitting) return;
//       setSubmitting(true);
//       try {
//         if (isSignIn) {
//           const response = await signin(data as SignInFormData);
//           dispatch(setCredentials({ user: response.user }));
//           toast.success("Login successful!");
//           navigate("/dashboard");
//         } else {
//           await signup(data as SignUpFormData);
//           toast.success("Account created successfully!");
//           setTimeout(() => navigate("/auth"), 1200);
//         }
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           toast.error(err.message);
//         } else {
//           toast.error("Something went wrong!");
//         }
//       } finally {
//         setSubmitting(false);
//       }
//     },
//     [isSignIn, dispatch, navigate, submitting]
//   );

//   // const handleOAuth = async (provider: "google" | "github") => {
//   //   // Redirect-based; backend should callback with token to frontend route
//   //   oauthLogin(provider);
//   // };

//   return (
//     <motion.form
//       onSubmit={handleSubmit(onSubmit)}
//       className="flex flex-col gap-4"
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//     >
//       {!isSignIn && (
//         <div className="flex flex-col">
//           <label className="text-sm text-white mb-1">Full Name</label>
//           <input
//             type="text"
//             placeholder="Enter your name"
//             {...register("fullName" as const)}
//             className="bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white placeholder:text-gray-400"
//           />
//         </div>
//       )}

//       <div className="flex flex-col">
//         <label className="text-sm text-white mb-1">Email Address</label>
//         <div className="relative">
//           <FiMail className="absolute left-3 top-3.5 text-gray-400" />
//           <input
//             type="email"
//             placeholder="Enter your email"
//             {...register("email" as const)}
//             className="w-full bg-white/10 border border-white/20 rounded-md pl-10 pr-4 py-2 text-white placeholder:text-gray-400"
//           />
//         </div>
//       </div>

//       <div className="flex flex-col">
//         <label className="text-sm text-white mb-1">Password</label>
//         <div className="relative">
//           <FiLock className="absolute left-3 top-3.5 text-gray-400" />
//           <input
//             type="password"
//             placeholder="Enter your password"
//             {...register("password" as const)}
//             className="w-full bg-white/10 border border-white/20 rounded-md pl-10 pr-4 py-2 text-white placeholder:text-gray-400"
//           />
//           <FiEye className="absolute right-3 top-3.5 text-gray-500 cursor-pointer" />
//         </div>
//       </div>

//       {!isSignIn && (
//         <div className="flex flex-col">
//           <label className="text-sm text-white mb-1">Confirm Password</label>
//           <input
//             type="password"
//             placeholder="Confirm your password"
//             {...register("confirm" as const)}
//             className="bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white placeholder:text-gray-400"
//           />
//         </div>
//       )}

//       {Object.values(errors).map((err, i) => (
//         <p className="text-red-400 text-xs" key={i}>
//           {err?.message as string}
//         </p>
//       ))}

//       {/* {isSignIn && (
//         <div className="text-right">
//           <button
//             type="button"
//             className="text-sm text-purple-300 hover:text-purple-100 transition"
//           >
//             Forgot password?
//           </button>
//         </div>
//       )} */}

//       <button
//         type="submit"
//         disabled={submitting}
//         className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:brightness-110 transition rounded-md py-2 text-white font-semibold disabled:opacity-60"
//       >
//         {isSignIn ? "Sign In" : "Create Account"}
//       </button>
// {/* 
//       <div className="border-t border-white/20 mt-4 pt-4 text-center text-sm text-gray-400">
//         OR CONTINUE WITH
//       </div>

//       <div className="flex gap-3">
//         <button
//           type="button"
//           onClick={() => handleOAuth("google")}
//           className="flex-1 flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white py-2 rounded-md hover:bg-white/20 transition"
//         >
//           <FaGoogle /> Google
//         </button>
//         <button
//           type="button"
//           onClick={() => handleOAuth("github")}
//           className="flex-1 flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white py-2 rounded-md hover:bg-white/20 transition"
//         >
//           <FaGithub /> GitHub
//         </button>
//       </div> */}
//     </motion.form>
//   );
// };



import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

type NavbarProps = {
  onAuthNavigate: (mode: "signin" | "signup") => void;
  onScrollTo: (id: string) => void;
};

export const Navbar: React.FC<NavbarProps> = ({ onAuthNavigate, onScrollTo }) => {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-700/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onScrollTo("top")}
            >
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Scan className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ResumeIQ
              </span>
            </motion.div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun className="h-5 w-5 text-gray-300" />
                )}
              </motion.button>

              <motion.button
                onClick={() => onAuthNavigate("signin")}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>

              <motion.button
                onClick={() => onAuthNavigate("signup")}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5 text-gray-600" />
                ) : (
                  <Sun className="h-5 w-5 text-white" />
                )}
              </button>
              <button
                onClick={toggleSidebar}
                className="text-gray-800 dark:text-white p-2 rounded-md hover:bg-white/10 transition"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0.1 }}
            className="fixed inset-0 z-50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg p-6 flex flex-col gap-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                  Menu
                </span>
                <button
                  onClick={toggleSidebar}
                  className="text-gray-800 dark:text-white p-2 hover:bg-white/10 rounded-full transition"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <button
                onClick={() => {
                  onAuthNavigate("signin");
                  setSidebarOpen(false);
                }}
                className="w-full py-2 text-left text-lg text-gray-800 dark:text-gray-200 hover:text-blue-500 transition"
              >
                Sign In
              </button>

              <button
                onClick={() => {
                  onAuthNavigate("signup");
                  setSidebarOpen(false);
                }}
                className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow"
              >
                Sign Up
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

