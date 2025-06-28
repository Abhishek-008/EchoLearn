'use client';

import { motion } from 'framer-motion';
import { FaBrain, FaMicrophoneAlt, FaQuestionCircle } from 'react-icons/fa';

export default function AboutPage() {
  const highlights = [
    {
      icon: <FaMicrophoneAlt size={28} className="text-blue-600" />,
      title: 'Voice-Based Learning',
      description: 'Start your journey by simply speaking your topic. It’s natural and hands-free.',
    },
    {
      icon: <FaBrain size={28} className="text-purple-600" />,
      title: 'AI-Powered Explanations',
      description: 'Receive tailored explanations in the tone and pace that suit your style.',
    },
    {
      icon: <FaQuestionCircle size={28} className="text-orange-600" />,
      title: 'Instant Quizzes',
      description: 'Test your understanding with dynamically generated MCQs.',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 px-6 py-12 text-gray-900 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">About EchoLearn</h1>
          <p className="text-lg sm:text-xl text-neutral-700 max-w-3xl mx-auto">
            EchoLearn is an AI-powered learning assistant that transforms how you study. Just speak your topic and let AI personalize your learning through explanations and quizzes.
          </p>
        </motion.section>

        {/* Feature Highlights */}
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white border border-neutral-200 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-700">{item.description}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Footer Note */}
        <motion.section
          className="text-center text-sm text-neutral-500 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Built with 💡 by a CSE student using AI, for learners everywhere.
        </motion.section>
      </div>
    </main>
  );
}
