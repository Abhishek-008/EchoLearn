'use client';
import React, { useRef, useState } from 'react';

export default function PDFUploader({ onExtract }: { onExtract: (text: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.text) {
        throw new Error(data.error || 'Could not extract text');
      }

      onExtract(data.text);
    } catch (err) {
      console.error(err);
      setError('⚠️ Could not process the file. Please try another PDF.');
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="text-sm"
      />
      {loading && <p className="text-purple-600 animate-pulse">📄 Reading PDF...</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
