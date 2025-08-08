

import { ToggleTabs } from '../components/ToggleTabs';
import { AuthForm } from '../components/AuthForm';
import { useState } from 'react';
import { motion } from 'framer-motion';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1443] to-[#071b3b] px-4 relative overflow-hidden">
      {/* Stars or dot effect */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:30px_30px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 bg-white/10 p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-md border border-white/20"
      >
        <h1 className="text-white text-2xl font-bold mb-2 text-center">Welcome to Resume IQ</h1>
        <p className="text-sm text-gray-300 mb-6 text-center">
          Sign in to your account or create a new one to get started
        </p>
        <ToggleTabs isSignIn={isSignIn} setIsSignIn={setIsSignIn} />
        <AuthForm isSignIn={isSignIn} />
      </motion.div>
    </div>
  );
};

export default AuthPage;
