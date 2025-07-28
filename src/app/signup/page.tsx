'use client';

import { useEffect, useState } from 'react';
import SignupForm from '../components/SignupForm';

export default function SignupFormWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Wait for client hydration
  }, []);

  if (!mounted) return null;

  return <SignupForm />;
}
