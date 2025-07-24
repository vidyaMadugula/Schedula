// components/Confirmation.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Confirmation({
  token,
}: {
  token: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/patient-details'); // Redirect after 0.5s
    }, 500);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl text-center max-w-sm shadow-xl">
        <img src="/avatars/success-badge.png" alt="success" className="mx-auto w-24 mb-4" />
        <h2 className="text-xl font-semibold text-black mb-1">Appointment Booked Successfully!</h2>
        <p className="text-sm text-gray-600 mb-2">
          Token No <span className="text-cyan-500 font-semibold">{token}</span>
        </p>
        <p className="text-xs text-gray-500">
          You will receive a notification 30 minutes before your appointment. Thank you!
        </p>
      </div>
    </div>
  );
}
