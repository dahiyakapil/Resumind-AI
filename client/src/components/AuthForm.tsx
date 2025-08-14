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
