'use client';

import BottomNav from './components/BottomNav';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BottomNav />
      <main className="pt-10 md:p-10 md:pt-16">{children}</main>
    </>
  );
}
