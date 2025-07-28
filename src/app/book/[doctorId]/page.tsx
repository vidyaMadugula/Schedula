// src/app/book/[doctorId]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SlotPicker from '../../components/SlotPicker'; // adjust path if needed

export default function BookPage() {
  const params = useParams();
  const [doctorId, setDoctorId] = useState<string | null>(null);

  useEffect(() => {
    const raw = Array.isArray(params?.doctorId) ? params.doctorId[0] : params?.doctorId;
    setDoctorId(raw ?? null);
  }, [params]);

  if (!doctorId) return <p>Loading...</p>;

  return <SlotPicker doctorId={doctorId} />;
}
