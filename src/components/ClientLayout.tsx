'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const hideNavbarRoutes = ['/', '/landing'];
  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {children}
    </>
  );
}
