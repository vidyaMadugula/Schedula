// app/confirmation/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmationCard from '../components/ConfirmationCard';

export default function ConfirmationPage() {
  const [token, setToken] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    // Generate a 4-digit token
    const randomToken = Math.floor(1000 + Math.random() * 9000).toString();
    setToken(randomToken);
  }, []);

  return (
    <ConfirmationCard token={token} onBookAnother={() => router.push('/doctors')} />
  );
}
