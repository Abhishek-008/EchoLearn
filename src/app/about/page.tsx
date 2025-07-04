'use client';

import { motion } from 'framer-motion';
import {
  FaBrain,
  FaMicrophoneAlt,
  FaQuestionCircle,
  FaSitemap,
} from 'react-icons/fa';

export default function AboutPage() {
  const features = [
    {
      icon: <FaMicrophoneAlt size={32} className="text-indigo-600" />,
      title: 'Voice-Based Learning',
      description: 'Start your journey by simply speaking your topic. It’s intuitive, hands-free, and natural.',
    },
    {
      icon: <FaBrain size={32} className="text-indigo-600" />,
      title: 'AI-Powered Explanations',
      description: 'Receive tailored explanations at your own pace and in your preferred tone.',
    },
    {
      icon: <FaQuestionCircle size={32} className="text-indigo-600" />,
      title: 'Instant Quizzes',
      description: 'Test your understanding with multiple-choice quizzes generated from your explanation.',
    },
    {
      icon: <FaSitemap size={32} className="text-indigo-600" />,
      title: 'Roadmap Generator',
      description: 'Visualize your learning path with an AI-curated flowchart customized by difficulty level.',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 px-6 py-16 text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">About EchoLearn</h1>
          <p className="text-lg sm:text-xl text-neutral-700 max-w-3xl mx-auto">
            EchoLearn is an AI-powered learning assistant that adapts to how you think, speak, and study —
            from speech-based input to personalized quizzes and a visual roadmap to mastery.
          </p>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white border border-neutral-200 rounded-xl shadow-md p-6 flex items-start gap-4 hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <div className="pt-1">{item.icon}</div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-black">{item.title}</h3>
                <p className="text-sm text-gray-700 leading-snug">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Footer Note */}
        <motion.footer
          className="text-center text-sm text-neutral-500 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Built with 💡 by a CSE student using AI — for learners everywhere.
        </motion.footer>
      </div>
    </main>
  );
}
