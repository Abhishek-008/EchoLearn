'use client';
import React, { useState } from 'react';

export default function MicInput({ onSubmit }: { onSubmit: (input: string, tone: string, speed: string) => void }) {
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);

  const handleVoice = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const speed = transcript.split(' ').length > 10 ? 'fast' : 'slow';
      const tone = 'neutral';

      setInput(transcript);
      onSubmit(transcript, tone, speed);
    };

    recognition.start();
  };

  const handleTypedSubmit = () => {
    const speed = input.split(' ').length > 10 ? 'fast' : 'slow';
    const tone = 'neutral';
    onSubmit(input, tone, speed);
  };

  return (
    <div className="space-y-4">
      <textarea
        className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        rows={4}
        placeholder="Type your topic or question here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex gap-4">
        <button
          onClick={handleTypedSubmit}
          className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-900 transition"
        >
          Submit
        </button>
        <button
          onClick={handleVoice}
          className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-900 transition"
        >
          {listening ? '🎙️ Listening...' : '🎤 Use Voice'}
        </button>
      </div>
    </div>
  );
}
