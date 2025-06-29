'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import aiAnimation from '@/app/animations/ai.json'; // adjust if needed

export default function HomePage() {
  const router = useRouter();

  const features = [
    {
      title: '🎤 Voice-first Input',
      description: 'Speak your topic and get an explanation in your tone and speed.',
      color: 'bg-blue-100',
    },
    {
      title: '🧠 Personalized Quiz',
      description: 'Instant MCQs based on what you just learned.',
      color: 'bg-orange-100',
    },
    {
      title: '⚡ Smart Feedback',
      description: 'Score and learn from mistakes immediately.',
      color: 'bg-purple-100',
    },
  ];

  return (
    <main className="bg-[#fefefe] min-h-screen flex flex-col items-center justify-start text-center px-6 pt-16 relative overflow-hidden">
      {/* Animated AI Illustration */}
      <div className="w-[300px] md:w-[400px] mx-auto z-10 mb-6">
        <Lottie animationData={aiAnimation} loop={true} />
      </div>

      <motion.h1
        className="text-5xl font-bold text-gray-900 max-w-2xl z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        EchoLearn — Personalized AI Learning
      </motion.h1>

      <motion.p
        className="text-gray-600 max-w-xl mt-4 text-lg z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Learn any topic your way — through speech, explanation, and quizzes.
      </motion.p>

      <motion.button
        onClick={() => router.push('/learn')}
        className="mt-6 bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-neutral-900 transition z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        🚀 Start Learning
      </motion.button>

      {/* Feature Cards */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mt-16 z-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            className={`${feature.color} rounded-xl shadow-md p-6 w-[260px]`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-semibold text-lg mb-2 text-gray-800">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating shapes (animated decoration) */}
      <motion.div
        className="absolute top-[-30px] left-[10%] w-24 h-24 bg-orange-200 rotate-12 rounded-full opacity-50 z-0"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
      <motion.div
        className="absolute bottom-[-40px] right-[10%] w-32 h-32 bg-purple-200 rotate-45 rounded-2xl opacity-40 z-0"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
      <motion.div
        className="absolute top-[50%] left-[-30px] w-20 h-20 bg-blue-200 rotate-6 rounded-md opacity-30 z-0"
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
    </main>
  );
}
