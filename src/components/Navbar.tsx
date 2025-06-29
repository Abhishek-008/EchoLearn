'use client';

import Link from 'next/link';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-gray-900">
        EchoLearn
      </Link>

      {/* Navigation links */}
      <div className="flex gap-6 text-gray-700 font-medium">
        <Link href="/learn" className="hover:text-black transition">
          Learn
        </Link>
        <Link href="/flashcard" className="hover:text-black transition">
          Flashcards
        </Link>
        <Link href="/about" className="hover:text-black transition">
          About
        </Link>
      </div>

      {/* Auth buttons */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton>
            <button className="text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="bg-white text-black border border-black px-4 py-2 rounded-full text-sm font-medium hover:bg-black hover:text-white transition">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}
