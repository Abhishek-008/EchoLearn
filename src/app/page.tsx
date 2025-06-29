'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import aiAnimation from '@/app/animations/ai1.json';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default function LandingPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  // 🔁 Redirect signed-in users to /home
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/home'); // avoids landing page in history
    }
  }, [isLoaded, isSignedIn, router]);

  // ⏳ While Clerk is loading
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-gray-500 text-lg">
        Loading EchoLearn...
      </div>
    );
  }

  // ✅ Render landing page only if not signed in
  if (isSignedIn) return null;

  return (
    <main className="bg-gradient-to-br from-gray-50 via-white to-gray-200 min-h-screen flex flex-col items-center justify-start text-center px-6 pt-20 relative overflow-hidden">
      {/* AI Animation */}
      <motion.div
        className="w-[280px] sm:w-[360px] md:w-[420px] mx-auto mb-6 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Lottie animationData={aiAnimation} loop />
      </motion.div>

      {/* Headline */}
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-gray-900 max-w-2xl leading-tight z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Welcome to EchoLearn
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-gray-700 text-base sm:text-lg max-w-xl mt-4 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Discover a smarter way to learn using voice, AI-powered explanations, and adaptive quizzes.
      </motion.p>

      {/* Sign In / Sign Up Buttons */}
      <motion.div
        className="mt-8 z-10 flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <SignInButton mode="modal">
          <button className="bg-black text-white px-6 py-3 rounded-lg text-base hover:bg-neutral-900 transition">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="bg-white border border-black text-black px-6 py-3 rounded-lg text-base hover:bg-gray-100 transition">
            Create Account
          </button>
        </SignUpButton>
      </motion.div>

      {/* Floating Decorations */}
      <motion.div
        className="absolute top-[5%] left-[10%] w-24 h-24 bg-orange-200 rotate-12 rounded-full opacity-40 z-0"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute bottom-[5%] right-[10%] w-32 h-32 bg-purple-200 rotate-45 rounded-2xl opacity-30 z-0"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
      <motion.div
        className="absolute top-[45%] left-[0%] w-20 h-20 bg-blue-200 rotate-6 rounded-md opacity-30 z-0"
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
    </main>
  );
}
