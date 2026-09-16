import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Logo } from '../components/Logo';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <Logo className="w-16 h-16" />
        </div>
        
        <h1 className="text-xl font-semibold text-zinc-100 mb-1">LONN HTET BROTHER</h1>
        <h2 className="text-sm text-zinc-400 mb-8 tracking-wide">Construction Co., Ltd.</h2>
        
        <button
          onClick={handleLogin}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-3"
        >
          <img src="https://www.gstatic.com/firebase/anonymous-scan.png" alt="" className="w-5 h-5 hidden" />
          Sign in with Google
        </button>
        
        <p className="mt-6 text-xs text-zinc-500 uppercase tracking-widest font-mono">
          Authorized Personnel Only
        </p>
      </motion.div>
    </div>
  );
}

