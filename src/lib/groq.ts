// src/lib/groq.ts

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY!;
const MODEL = 'llama3-70b-8192';

//
// 🌐 Generic helper to call Groq API
//
export async function callGroq(prompt: string, temperature = 0.5): Promise<string> {
  const res = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature,
    }),
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(`Groq API Error: ${data.error.message}`);
  }

  return data.choices?.[0]?.message?.content?.trim() || '';
}

//
// 📘 Explanation Generator
//
export async function getExplanation(input: string, tone: string, speed: string) {
  const style = speed === 'fast' ? 'brief' : 'detailed';
  const prompt = `Explain the topic "${input}" to a student in a ${tone} tone and ${speed} pace. The explanation should be ${style}, simple, and student-friendly. Avoid Markdown and asterisks. Use clear, plain formatting.`;
  return await callGroq(prompt);
}

//
// 🧠 Quiz Generator
//
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

Respond ONLY in strict JSON format. No extra commentary.
`;

  const result = await callGroq(prompt);

  try {
    return JSON.parse(result);
  } catch {
    throw new Error('❌ Quiz format invalid or not parseable.');
  }
}

//
// 🧭 Roadmap / Flowchart Generator
//
export async function generateFlowchart(
  topic: string,
  level: string
): Promise<{ section: string; topics: string[] }[]> {
  const prompt = `
You are an AI tutor helping a ${level.toLowerCase()}-level student understand the topic: "${topic}".

Instructions:
- For Beginner: Create a roadmap with 2–3 sections, each with 2–4 simple subtopics.
- For Intermediate: Include 3–5 sections with 3–5 moderately detailed subtopics.
- For Expert: Cover 4–7 advanced sections with 4–6 deep subtopics each.
- Order topics logically for optimal learning progression.
- Keep section titles short and informative.
- Return ONLY valid JSON — no headings, explanations, or markdown.

Format:
[
  {
    "section": "Section Name",
    "topics": ["Subtopic 1", "Subtopic 2", "Subtopic 3"]
  },
  ...
]
`;

  const rawOutput = await callGroq(prompt, 0.4);
  const match = rawOutput.match(/\[\s*{[\s\S]*?}\s*\]/);

  if (!match) {
    throw new Error('⚠️ Could not extract valid roadmap JSON.');
  }

  try {
    const parsed = JSON.parse(match[0]);

    if (
      Array.isArray(parsed) &&
      parsed.every(
        (section) =>
          typeof section.section === 'string' &&
          Array.isArray(section.topics) &&
          section.topics.every((t: string) => typeof t === 'string')
      )
    ) {
      return parsed;
    } else {
      throw new Error('⚠️ Roadmap structure is invalid.');
    }
  } catch (err) {
    throw new Error('⚠️ JSON parsing failed: ' + (err as Error).message);
  }
}
