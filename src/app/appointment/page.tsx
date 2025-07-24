'use client';
import { useEffect, useState } from 'react';
import { getDoctors } from '../../services/api';
import DoctorList from '../../components/DoctorList';
import type { Doctor } from '../../types';

export default function AppointmentPage() {
  const [docs, setDocs] = useState<Doctor[] | null>(null);

  useEffect(() => {
    getDoctors().then(setDocs);
  }, []);

  if (!docs) {
    // Prevents mismatch by rendering consistent SSR output
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Loading doctors...</p>
      </div>
    );
  }

  return (
    <DoctorList doctors={docs} loggedInEmail="priya.malhotra@example.com" />
  );
}
