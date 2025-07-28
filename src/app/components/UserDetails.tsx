// components/UserDetails.tsx
'use client';

import { useEffect, useState } from 'react';

export default function UserDetails() {
  const [user, setUser] = useState<{ name: string; image: string } | null>(null);

  useEffect(() => {
    // Simulated user data (replace with real auth logic)
    setUser({
      name: 'Vidya Madugula',
      image: '/avatars/user.png',
    });
  }, []);

  if (!user) return null;

  return (
    <div className="block md:hidden px-4 py-3 border-b bg-white">
      <div className="flex items-center space-x-3">
        <img
          src={user.image}
          alt={user.name}
          width={36}
          height={36}
          className="rounded-full border-2 border-blue-500"
        />
        <div>
          <p className="text-sm font-semibold text-gray-800">Welcome, {user.name}</p>
          <p className="text-xs text-gray-500">Find the best doctors for your needs</p>
        </div>
      </div>
    </div>
  );
}
