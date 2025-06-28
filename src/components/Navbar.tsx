'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-gray-900">
        EchoLearn
      </Link>

      <div className="flex gap-6 text-gray-700 font-medium">
        <Link href="/learn" className="hover:text-black transition">Learn</Link>
        <Link href="/flashcards" className="hover:text-black transition">Flashcards</Link>
        <Link href="/about" className="hover:text-black transition">About</Link>
      </div>
    </nav>
  );
}
