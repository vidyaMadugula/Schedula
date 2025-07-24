'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Doctor } from '../types';
import { users } from '../data/users';

export default function DoctorList({
  doctors,
  loggedInEmail
}: {
  doctors: Doctor[];
  loggedInEmail: string;
}) {
  const router = useRouter();

  const [userName, setUserName] = useState('Vidya');
  const [location, setLocation] = useState('Gatkesar, Hyderabad');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);
  const [today, setToday] = useState<string>('');

  useEffect(() => {
    const clientDate = new Date().toISOString().slice(0, 10);
    setToday(clientDate);
  }, []);

  useEffect(() => {
    const user = users.find((u) => u.email === loggedInEmail);
    if (user) {
      setUserName(user.name);
    }
  }, [loggedInEmail]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = doctors.filter((doc) =>
      doc.name.toLowerCase().includes(query)
    );
    setFilteredDoctors(filtered);
  }, [searchQuery, doctors]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img
            src="/avatars/user.png"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-lg">Hello, {userName}</p>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Doctors"
          className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Doctors List */}
      {filteredDoctors.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDoctors.map((d) => (
            <div
              key={d.id}
              onClick={() => router.push(`/book?id=${d.id}`)}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex gap-4 items-center sm:flex-row flex-row cursor-pointer hover:shadow-lg transition-all"
            >
              <img
                src={d.avatarUrl}
                alt={d.name}
                className="w-32 h-32 object-cover rounded-l-2xl"
              />
              <div className="p-4 flex flex-col justify-between flex-1">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold">{d.name}</h3>
                  <p className="text-sm text-sky-600">{d.specialty}</p>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {d.bio}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm px-2 py-1 bg-green-100 text-green-600 rounded-md">
                    Available today
                  </span>
                  <span className="text-sm px-2 py-1 bg-gray-100 text-gray-800 rounded-md">
                    {today && d.slots[today]?.[0] || '9:00 AM – 05:00 PM'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
