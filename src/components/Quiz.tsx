'use client';
import React, { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export default function Quiz({ quizData }: { quizData: Question[] }) {
  const [selected, setSelected] = useState<string[]>(Array(quizData.length).fill(''));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex: number, option: string) => {
    const newAnswers = [...selected];
    newAnswers[qIndex] = option;
    setSelected(newAnswers);
  };

  const handleReset = () => {
    setSelected(Array(quizData.length).fill(''));
    setSubmitted(false);
  };

  const score = quizData.reduce(
    (total, q, i) => total + (selected[i] === q.answer ? 1 : 0),
    0
  );

  const allAnswered = selected.every((answer) => answer !== '');

  return (
    <div className="bg-gray-100 rounded-2xl shadow-md p-6 sm:p-8 transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Quiz</h2>

      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-6">
        {quizData.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-full rounded-full ${
              submitted
                ? selected[i] === quizData[i].answer
                  ? 'bg-green-500'
                  : 'bg-red-400'
                : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>

      {quizData.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="font-medium text-gray-900 mb-2">
            <span className="font-bold text-blue-700">{i + 1}.</span> {q.question}
          </p>
          <div className="pl-4 space-y-1">
            {q.options.map((opt, j) => {
              const isCorrect = opt === q.answer;
              const isUserAnswer = selected[i] === opt;
              const showCorrect = submitted && isCorrect;
              const showWrong = submitted && isUserAnswer && !isCorrect;

              return (
                <label key={j} className="block">
                  <input
                    type="radio"
                    name={`q-${i}`}
                    value={opt}
                    disabled={submitted}
                    checked={selected[i] === opt}
                    onChange={() => handleSelect(i, opt)}
                    className="mr-2"
                  />
                  <span
                    className={
                      showCorrect
                        ? 'text-green-700 font-semibold'
                        : showWrong
                        ? 'text-red-600 line-through'
                        : 'text-gray-800'
                    }
                  >
                    {opt}
                  </span>
                  {showCorrect && <span className="ml-2 text-green-600">✅</span>}
                  {showWrong && <span className="ml-2 text-red-500">❌</span>}
                </label>
              );
            })}

            {submitted && selected[i] !== q.answer && (
              <p className="text-sm text-green-700 mt-1">
                ✅ Correct answer: <strong>{q.answer}</strong>
              </p>
            )}
          </div>
        </div>
      ))}

      {!submitted ? (
        <div className="mt-4 text-center">
          <button
            onClick={() => setSubmitted(true)}
            disabled={!allAnswered}
            className={`px-5 py-2 rounded-md transition font-medium ${
              allAnswered
                ? 'bg-black text-white hover:bg-neutral-900'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
          >
            Submit Quiz
          </button>
          {!allAnswered && (
            <p className="text-sm text-red-600 mt-2">⚠️ Please answer all questions to submit.</p>
          )}
        </div>
      ) : (
        <div className="mt-6 space-y-3 text-center">
          <p className="text-green-700 font-semibold text-lg">
            ✅ You scored {score} / {quizData.length}
          </p>
          <button
            onClick={handleReset}
            className="bg-black text-white px-5 py-2 rounded-md hover:bg-neutral-900 transition"
          >
            🔄 Try Again
          </button>
        </div>
      )}
    </div>
  );
}
