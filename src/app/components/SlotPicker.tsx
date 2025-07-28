
'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ChevronLeft, Calendar } from 'lucide-react';
import clsx from 'clsx';

type FormData = {
  patientName: string;
  slot: string;
};

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  location:string;
  about:string;
};

export default function SlotPicker({ doctorId }: { doctorId: string }) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormData>();
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [selectedSlot, setSelectedSlot] = useState('');
  const [unavailable, setUnavailable] = useState<string[]>([]);
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  // Fetch doctor info
  useEffect(() => {
    fetch(`/api/doctors/${doctorId}`)
      .then(res => res.json())
      .then(data => setDoctor(data));
  }, [doctorId]);

  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const createSlots = (start: string, end: string): string[] => {
    const slots: string[] = [];
    let cur = new Date(`1970-01-01T${start}:00`);
    const stop = new Date(`1970-01-01T${end}:00`);
    while (cur < stop) {
      const slotStart = new Date(cur);
      const slotEnd = new Date(cur.getTime() + 15 * 60000);
      slots.push(`${slotStart.toTimeString().slice(0, 5)} - ${slotEnd.toTimeString().slice(0, 5)}`);
      cur = new Date(cur.getTime() + 30 * 60000);
    }
    return slots;
  };

  const morningSlots = createSlots('09:30', '13:00');
  const eveningSlots = createSlots('14:00', '17:00');

  useEffect(() => {
    const randomUnavailable = [...morningSlots, ...eveningSlots]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    setUnavailable(randomUnavailable);
  }, []);

 const onSubmit = async (data: FormData) => {
    const finalTime = `${selectedDate} ${data.slot}`;

    //  Create the appointment
    await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doctorId,
        time: finalTime,
        patientName: data.patientName || 'Anonymous',
      }),
    });

    //  Navigate to the static confirmation page
    router.push('/confirmation');
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-x-2">
        <button onClick={() => router.back()} className="flex items-center text-blue-600">
          <ChevronLeft className="mr-1" />  
        </button>
         <h1 className="text-xl font-semibold text-blue-600">Book Appointment</h1>
       
      </div>

      {/* Doctor Info */}
      {doctor && (
        <div className="flex items-center gap-4  p-4 rounded-2xl shadow-sm bg-blue-300">
          <img
            src={doctor.imageUrl}
            alt={doctor.name}
            className="w-16 h-16 rounded-2xl object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">{doctor.name}</h2>
            <p className="text-sm text-black">{doctor.specialty} - {doctor.location}</p>
            <p className="text-sm text-black">{doctor.about}</p>
          </div>
        </div>
      )}

      {/* Date and Slot Picker */}
      <h2 className="font-semibold text-lg">Select Slot</h2>

      <div className="flex flex-col md:flex-row md:gap-8">
        {/* Date Picker */}
        <div className="md:w-1/2">
          <div className="flex items-center justify-between text-gray-700 mb-2">
            <span>{new Date(selectedDate).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
            <Calendar className="h-5 w-5" />
          </div>

          <div className="flex overflow-x-auto gap-2 py-2 md:flex-wrap md:gap-4">
            {days.map(date => {
              const isSelected = new Date(date).toDateString() === selectedDate;
              return (
                <button
                  key={date.toDateString()}
                  type="button"
                  onClick={() => setSelectedDate(date.toDateString())}
                  className={clsx(
                    'flex flex-col items-center px-3 py-2 rounded border min-w-[60px]',
                    isSelected ? 'bg-blue-500 text-white' : 'bg-white text-black'
                  )}
                >
                  <span className="text-sm">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                  <span className="text-lg font-medium">{date.getDate()}</span>
                  <span className="text-xs">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Slot Picker */}
        <div className="md:w-1/2 space-y-6 mt-4 md:mt-0">
          <div>
            <h3 className="text-sm font-semibold mb-1">Morning Slot</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {morningSlots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => !unavailable.includes(slot) && setSelectedSlot(slot)}
                  className={clsx(
                    'p-2 border rounded text-center text-sm',
                    unavailable.includes(slot)
                      ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
                      : selectedSlot === slot
                      ? 'bg-blue-500 text-white'
                      : 'bg-white'
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-1">Evening Slot</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {eveningSlots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => !unavailable.includes(slot) && setSelectedSlot(slot)}
                  className={clsx(
                    'p-2 border rounded text-center text-sm',
                    unavailable.includes(slot)
                      ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
                      : selectedSlot === slot
                      ? 'bg-blue-500 text-white'
                      : 'bg-white'
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden slot input for form submission */}
      <input type="hidden" value={selectedSlot} {...register('slot')} />

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <button
          type="submit"
          disabled={!selectedSlot}
          className={clsx(
            'px-6 py-2 rounded text-white text-lg font-medium',
            selectedSlot ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          )}
        >
          Book Appointment
        </button>
      </div>
    </form>
  );
}
