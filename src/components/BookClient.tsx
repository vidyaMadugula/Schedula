'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Confirmation from '../components/Confirmation';
import { doctors } from '../data/doctors';
import { getNextNDates, generateTimeSlots } from '../utils/timeUtils';
import { CalendarDays, ArrowLeft } from 'lucide-react';

const getRandomUnavailableSlots = (slots: string[]) => {
  const count = Math.floor(Math.random() * (slots.length / 4)) + 1;
  const shuffled = [...slots].sort(() => 0.5 - Math.random());
  return new Set(shuffled.slice(0, count));
};

export default function BookPage() {
  const router = useRouter();
  const id = useSearchParams().get('id')!;
  const doc = doctors.find((d) => d.id === id)!;

  const morningSlots = generateTimeSlots('09:00', '13:00');
  const eveningSlots = generateTimeSlots('14:00', '17:00');
  const allSlots = [...morningSlots, ...eveningSlots];

  const allDates = getNextNDates(20);
  const [selectedDate, setSelectedDate] = useState(allDates[0]);
  const [slot, setSlot] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [token, setToken] = useState<string>();
  const [unavailableSlotsMap, setUnavailableSlotsMap] = useState<Record<string, Set<string>>>({});

  useEffect(() => {
    const map: Record<string, Set<string>> = {};
    allDates.forEach((date) => {
      map[date] = getRandomUnavailableSlots(allSlots);
    });
    setUnavailableSlotsMap(map);
  }, []);

  useEffect(() => {
    if (showConfirmation) {
      setToken(Math.floor(1000 + Math.random() * 9000).toString());
    }
  }, [showConfirmation]);

  const selectedMonth = new Date(selectedDate).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-4">
        <button onClick={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="ml-2 text-lg font-semibold text-gray-800">Book Appointment</h1>
      </div>

      {/* Doctor Info */}
      <div className="flex items-center gap-4 bg-cyan-100 p-4 rounded-xl mb-4 shadow-sm">
        <img src={doc.avatarUrl} alt={doc.name} className="w-16 h-16 rounded-full object-cover border" />
        <div>
          <h2 className="text-lg font-semibold">{doc.name}</h2>
          <p className="text-sm text-gray-700">{doc.specialty}</p>
          <p className="text-sm text-gray-500">{doc.bio}</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Date Picker */}
        <div className="md:w-1/2">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className="w-5 h-5 text-gray-500" />
            <h3 className="text-sm text-gray-600">{selectedMonth}</h3>
          </div>

          {/* Mobile */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-2 md:hidden">
            {allDates.map((date) => {
              const d = new Date(date);
              return (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg text-sm min-w-[70px] h-[70px] ${
                    selectedDate === date ? 'bg-cyan-500 text-white' : 'bg-white border'
                  }`}
                >
                  <span className="font-semibold">{d.getDate()}</span>
                  <span className="text-xs">{d.toLocaleDateString('en-US', { month: 'short' })}</span>
                  <span className="text-xs">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop */}
          <div className="hidden md:grid md:grid-cols-4 md:gap-2">
            {allDates.map((date) => {
              const d = new Date(date);
              return (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg text-sm h-[80px] ${
                    selectedDate === date ? 'bg-cyan-500 text-white' : 'bg-white border'
                  }`}
                >
                  <span className="font-semibold text-base">{d.getDate()}</span>
                  <span className="text-xs">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                  <span className="text-xs">{d.toLocaleDateString('en-US', { month: 'short' })}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Slot Picker */}
        <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Select Slot</h3>

          {/* Morning Slots */}
          <div className="mb-3">
            <h4 className="text-xs font-semibold text-gray-500 mb-1">Morning</h4>
            <div className="grid grid-cols-3 gap-2">
              {morningSlots.map((s) => {
                const isUnavailable = unavailableSlotsMap[selectedDate]?.has(s);
                const isSelected = slot === s;
                return (
                  <button
                    key={s}
                    onClick={() => !isUnavailable && setSlot(s)}
                    disabled={isUnavailable}
                    className={`px-3 py-2 rounded-lg text-sm border text-center h-[40px] ${
                      isUnavailable
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : isSelected
                        ? 'bg-cyan-500 text-white'
                        : 'bg-white hover:bg-cyan-100'
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evening Slots */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 mb-1">Evening</h4>
            <div className="grid grid-cols-3 gap-2">
              {eveningSlots.map((s) => {
                const isUnavailable = unavailableSlotsMap[selectedDate]?.has(s);
                const isSelected = slot === s;
                return (
                  <button
                    key={s}
                    onClick={() => !isUnavailable && setSlot(s)}
                    disabled={isUnavailable}
                    className={`px-3 py-2 rounded-lg text-sm border text-center h-[40px] ${
                      isUnavailable
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : isSelected
                        ? 'bg-cyan-500 text-white'
                        : 'bg-white hover:bg-cyan-100'
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Book Button */}
      <div className="flex justify-center mt-6">
        <button
          disabled={!slot}
          onClick={() => {
            setShowConfirmation(true);
            setTimeout(() => router.push('/patient-details'), 2500);
          }}
          className="bg-cyan-500 text-white py-2 px-6 rounded-lg disabled:opacity-50"
        >
          Book Appointment
        </button>
      </div>

      {/* Confirmation Popup */}
      {showConfirmation && token && <Confirmation token={token} />}
    </div>
  );
}

