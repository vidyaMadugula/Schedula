// app/patient-details/page.tsx
'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PatientDetailsPage() {
  const router = useRouter();
  const [gender, setGender] = useState('Male');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Top bar */}
      {/* <div className="flex items-center mb-4">
        <button onClick={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <h1 className="ml-2 text-white text-lg font-semibold">Patient Details (Optional)</h1>
      </div> */}
      {/* Top bar */}
<div className="flex items-center mb-4 bg-cyan-500 p-3 rounded-lg">
  <button onClick={() => router.back()} className="p-2 -ml-2">
    <ArrowLeft className="h-5 w-5 text-white" />
  </button>
  <h1 className="ml-2 text-white text-lg font-semibold">Patient Details (Optional)</h1>
</div>


      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-md font-semibold mb-4">Patient Details</h2>

        <input type="text" placeholder="Patient Name" className="input-style" />
        {/* <div className="flex my-2">
          <input type="number" placeholder="Age" className="input-style w-fit" />
          <div className="flex gap-2">
            {['Male', 'Female', 'Other'].map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`px-3 py-2 rounded-lg text-sm border ${
                  gender === g ? 'bg-cyan-500 text-white' : 'bg-white'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div> */}
       <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-2 w-full">
  <input
    type="number"
    placeholder="Age"
    className="input-style h-10 text-center"
  />
  {['Male', 'Female', 'Other'].map((g) => (
    <button
      key={g}
      onClick={() => setGender(g)}
      className={`h-10 text-sm rounded-lg border px-2 text-center ${
        gender === g ? 'bg-cyan-500 text-white' : 'bg-white'
      }`}
    >
      {g}
    </button>
  ))}
</div>



        <textarea placeholder="Write your problem" className="input-style h-20" />
        <input placeholder="Brother/sister/mother" className="input-style" />
        <input type="tel" placeholder="Mobile number" className="input-style" />

        <div className="mt-4 flex flex-col gap-2">
          <button className="w-full bg-cyan-100 border text-cyan-600 py-2 rounded-lg font-semibold">
            Make Payment
          </button>
          <button className="w-full bg-cyan-500 text-white py-2 rounded-lg font-semibold">
            Add Patient Details
          </button>
        </div>
      </div>
    </div>
  );
}
