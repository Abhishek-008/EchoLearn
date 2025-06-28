'use client';

import React, { useState } from 'react';
import MicInput from '@/components/MicInput';
import { getExplanation } from '@/lib/groq';

type Flashcard = {
  front: string;
  back: string;
};

export default function FlashcardsPage() {
  const [, setTopic] = useState('');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);

  const generateFlashcards = async (input: string) => {
    setLoading(true);
    setFlashcards([]);

    try {
      const explanation = await getExplanation(input, 'neutral', 'slow');

      const prompt = `
Based on the following explanation, generate 5 flashcards in JSON format.

"""
${explanation}
"""

Each flashcard should have:
- "front": A question, keyword, or concept.
- "back": A clear explanation or definition.

Respond only with valid JSON array, no extra text.
`;

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.5,
        }),
      });

      const data = await res.json();
      const cards: Flashcard[] = JSON.parse(data.choices?.[0]?.message?.content?.trim() || '[]');
      setFlashcards(cards);
    } catch (err) {
      console.error(err);
      alert('⚠️ Failed to generate flashcards.');
    }

    setLoading(false);
  };

  const handleSubmit = (input: string) => {
    setTopic(input);
    generateFlashcards(input);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4 sm:px-8 py-10 text-gray-900 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <section className="text-center">
          <h1 className="text-4xl font-bold text-black mb-2">🃏 Flashcards Generator</h1>
          <p className="text-lg sm:text-xl text-neutral-700 max-w-3xl mx-auto">
            Speak or enter a topic to generate flashcards with key concepts and explanations.
          </p>
        </section>

        {/* Mic Input */}
        <section className="bg-white border border-neutral-200 rounded-2xl shadow-md p-6 sm:p-8 transition-all duration-300">
          <h2 className="text-xl font-semibold text-black mb-4">Enter a topic to generate flashcards</h2>
          <MicInput onSubmit={handleSubmit} />
        </section>

        {/* Loading */}
        {loading && (
          <div className="text-center text-purple-600 font-medium text-lg animate-pulse">
            🧠 Generating flashcards...
          </div>
        )}

        {/* Flashcards */}
        {!loading && flashcards.length > 0 && (
          <section className="bg-white border border-neutral-200 rounded-2xl shadow-md p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-black mb-6">Flashcards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {flashcards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm transition hover:shadow-md"
                >
                  <p className="font-semibold text-black mb-2">🔹 {card.front}</p>
                  <p className="text-gray-800 text-sm">{card.back}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
