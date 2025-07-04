'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generateFlowchart } from '@/lib/groq';
import { generateFlowchartGraph } from '@/lib/flowchartUtils';
import FlowchartCanvas from '@/components/FlowchartCanvas';
import { Node, Edge } from 'reactflow';
import { useRouter } from 'next/navigation';

type FlowchartSection = {
  section: string;
  topics: string[];
};

export default function RoadmapPage() {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [structured, setStructured] = useState<FlowchartSection[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError('');
    setStructured([]);
    setNodes([]);
    setEdges([]);

    try {
      const roadmap = await generateFlowchart(topic, level);
      setStructured(roadmap);

      const { nodes, edges } = await generateFlowchartGraph(roadmap);
      setNodes(nodes);
      setEdges(edges);
    } catch (err) {
      console.error('❌ Flowchart generation failed:', err);
      setError('⚠️ Failed to generate roadmap. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTopicClick = (t: string) => {
    router.push(`/learn?topic=${encodeURIComponent(t)}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-16 text-center text-black">
      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold mb-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        AI-Powered Learning Roadmap
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mb-6 text-lg max-w-xl mx-auto text-black"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Enter a topic and your level to generate a personalized roadmap with a clear visual flow.
      </motion.p>

      {/* Input Prompt */}
      <p className="text-lg font-semibold text-black mb-2">
        What would you like to learn today?
      </p>

      {/* Form Inputs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md shadow-sm bg-white text-black"
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-black"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Expert</option>
        </select>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-neutral-900 transition"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-600 font-medium mb-6 animate-pulse">
          {error}
        </p>
      )}

      {/* 📝 Structured Roadmap View */}
      {!loading && structured.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-black mb-4 text-left max-w-4xl mx-auto">
             Suggested Roadmap
          </h2>
          <section className="max-w-4xl mx-auto mb-12 space-y-6 text-left">
            {structured.map((section, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-4"
              >
                <h3 className="text-xl font-semibold text-black mb-3 flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-gray-800 rounded-full"></span>
                  {section.section}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {section.topics.map((t, j) => (
                    <button
                      key={j}
                      onClick={() => handleTopicClick(t)}
                      className="px-3 py-1 bg-gray-100 text-black text-sm rounded-full border border-gray-300 hover:bg-gray-200 transition"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </>
      )}

      {/* 🔗 Flowchart */}
      {!loading && nodes.length > 0 && edges.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-black mb-4 text-left max-w-6xl mx-auto">
             Visual Learning Flowchart
          </h2>
          <section className="max-w-6xl mx-auto">
            <FlowchartCanvas nodes={nodes} edges={edges} />
          </section>
        </>
      )}
    </main>
  );
}
