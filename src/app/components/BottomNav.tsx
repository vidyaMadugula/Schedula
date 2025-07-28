

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CalendarCheck, FileText, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; image: string } | null>(null);

  useEffect(() => {
    // Simulated logged-in user (replace with real auth in future)
    setUser({
      name: 'Vidya Madugula',
      image: '/avatars/user.png',
    });
  }, []);

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t z-50 md:top-0 md:bottom-auto md:left-0 md:right-0 md:flex md:justify-between md:items-center md:px-6 md:py-3 md:border-b md:z-50">

      <div className="flex justify-between items-center w-full px-4 py-2 md:px-0 md:py-0">
        {/* Desktop view user info (inline) */}
        {user && (
          <div className="hidden md:flex items-center space-x-4">
            <img
              src={user.image}
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full border-2 border-blue-500"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">Welcome, {user.name}</p>
              <p className="text-xs text-gray-500">Find the best doctors for your needs</p>
            </div>
          </div>
        )}

        {/* Nav Items */}
        <ul className="flex justify-around w-full md:space-x-8 md:justify-end md:w-auto md:items-center">
          <NavItem href="/doctors" label="Find a Doctor" icon={<Home />} active={pathname === '/doctors'} />
          <NavItem href="/doctors" label="Appointment" icon={<CalendarCheck />} active={pathname === '/appointment'} />
          <NavItem href="/doctors" label="Records" icon={<FileText />} active={pathname === '/records'} />
          <NavItem href="/doctors" label="Profile" icon={<User />} active={pathname === '/profile'} />
        </ul>
      </div>
    </nav>
  );
}

function NavItem({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center space-x-1 ${active ? 'text-blue-500' : 'text-gray-600'} hover:text-blue-600`}
      >
        {icon}
        <span className="hidden md:inline text-sm font-medium">{label}</span>
      </Link>
    </li>
  );
}
