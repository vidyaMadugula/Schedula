'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Doctor } from '@/types';


export default function DoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
   

  useEffect(() => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => {
        const limited = data.slice(0, 12);
        setDoctors(limited);
        setFilteredDoctors(limited);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading doctors:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = doctors.filter(doc =>
      doc.name.toLowerCase().includes(value.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  const handleDoctorClick = (doctorId: string) => {
    setSelectedId(doctorId);
    router.push(`/book/${doctorId}`);
  };

  if (loading) return <p className="text-center py-4">Loading doctors...</p>;

  return (
    <div className="px-6 py-4">
        

      {/* 🔍 Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Doctors..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 🧑‍⚕️ Doctor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              onClick={() => handleDoctorClick(doc.id)}
              className={`flex flex-row items-center bg-white shadow-md rounded-lg cursor-pointer h-48 p-4 transition hover:shadow-lg hover:scale-[1.01] border ${
                selectedId === doc.id ? 'border-blue-500' : 'border-transparent'
              }`}
            >
              {/* Doctor Image */}
              <div className="flex-shrink-0">
                <Image
                  src={doc.imageUrl || '/placeholder-doctor.png'}
                  alt={doc.name}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover h-36 w-44"
                />
              </div>

              {/* Doctor Info */}
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-bold text-gray-800">{doc.name}</h2>
                <p className="text-gray-600">{doc.specialty}</p>

                {doc.availableToday && (
                  <div className="mt-1">
                    <span className="inline-block px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                      Available Today
                    </span>
                  </div>
                )}

                <p className="text-sm text-gray-500 mt-1 truncate max-w-[180px]">
  {doc.about}
</p>



                <p className="text-sm mt-1 inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-2xl">
                  {formatTime(doc.workingHours.start)} – {formatTime(doc.workingHours.end)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No doctors match your search.</p>
        )}
      </div>
    </div>
  );
}

// Utility to format time like "09:00" → "9:00 AM"
function formatTime(time24: string): string {
  const [hour, minute] = time24.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
}
