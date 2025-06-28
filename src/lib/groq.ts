// lib/groq.ts

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY!;
const MODEL = 'llama3-70b-8192';

// Helper to call Groq API
async function callGroq(prompt: string) {
  const res = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
    }),
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(`Groq API Error: ${data.error.message}`);
  }

  return data.choices?.[0]?.message?.content?.trim() || '';
}

// Explanation Generator
export async function getExplanation(input: string, tone: string, speed: string) {
  const style = speed === 'fast' ? 'brief' : 'detailed';
  const prompt = `Explain the topic "${input}" to a student in a ${tone} tone and ${speed} pace. The explanation should be ${style}, simple, and student-friendly. Avoid Markdown and asterisks. Use clear plain formatting.`;
  return await callGroq(prompt);
}

// Quiz Generator
export async function getQuiz(explanation: string) {
  const prompt = `
You are a quiz generator.

Based on the following explanation, generate 3 multiple-choice questions (MCQs) in JSON format.

"""
${explanation}
"""

Each question must include:
- "question": A clear question.
- "options": An array of 4 choices.
- "answer": The correct answer (one of the options).

Respond ONLY in strict JSON format. No extra text.
`;

  const result = await callGroq(prompt);

  try {
    return JSON.parse(result);
  } catch {
    throw new Error('Quiz format invalid or not parseable.');
  }
}

// Text Summarizer (handles large inputs by truncating)
export async function getSummaryFromText(text: string) {
  const maxTokens = 7500; // Adjust to keep below Groq's 8192 limit
  const truncatedText = text.slice(0, maxTokens);
  const prompt = `Summarize the following content in simple and concise terms:\n\n"${truncatedText}"\n\nAvoid Markdown formatting. Just plain text.`;

  return await callGroq(prompt);
}
