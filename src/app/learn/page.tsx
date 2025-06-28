'use client';

import React, { useState } from 'react';
import MicInput from '@/components/MicInput';
import { getExplanation, getQuiz } from '@/lib/groq';
import Quiz from '@/components/Quiz';
import { motion } from 'framer-motion';

export default function LearnPage() {
  const [explanation, setExplanation] = useState('');
  const [quiz, setQuiz] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (input: string, tone: string, speed: string) => {
    setLoading(true);
    setExplanation('');
    setQuiz([]);

    try {
      const explain = await getExplanation(input, tone, speed);
      setExplanation(explain);

      const quizData = await getQuiz(explain);
      setQuiz(quizData);
    } catch (err) {
      console.error(err);
      setExplanation('⚠️ Failed to load content.');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 sm:px-8 py-10 text-gray-900 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">

        {/* Header Description */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-black">🎓 Learn Your Way</h1>
          <p className="text-lg sm:text-xl text-neutral-700 max-w-3xl mx-auto">
            Speak your topic, get a personalized explanation, and test yourself with an AI-powered quiz.
          </p>
        </motion.section>

        {/* Voice Input */}
        <motion.section
          className="bg-white border border-neutral-200 rounded-2xl shadow-xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-black mb-4">🎤 Start by speaking your topic</h2>
          <MicInput onSubmit={handleSubmit} />
        </motion.section>

        {/* Loading Message */}
        {loading && (
          <motion.div
            className="text-center text-purple-600 font-medium text-lg animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            🧠 Generating your personalized learning content...
          </motion.div>
        )}

        {/* Explanation Section */}
        {!loading && explanation && (
          <motion.section
            className="bg-white border border-neutral-200 rounded-2xl shadow-md p-6 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-black mb-4">📘 Explanation</h2>
            <p className="whitespace-pre-wrap leading-relaxed text-neutral-800 text-base">
              {explanation}
            </p>
          </motion.section>
        )}

        {/* Quiz Section */}
        {!loading && quiz.length > 0 && (
          <motion.section
            className="bg-white border border-neutral-200 rounded-2xl shadow-md p-6 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-black mb-4">📝 Quiz</h2>
            <Quiz quizData={quiz} />
          </motion.section>
        )}
      </div>
    </main>
  );
}
