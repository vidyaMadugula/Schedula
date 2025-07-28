
// src/app/api/doctors/[[...params]]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import rawDoctors from '@/data/doctors.json';
import rawAppointments from '@/data/appointments.json';
import type { Doctor, Appointment } from '@/types';

const doctors = rawDoctors as Doctor[];
const appointments = rawAppointments as Appointment[];

function makeSlots(start: string, end: string, dur: number): string[] {
  const slots: string[] = [];
  let cur = new Date(`1970-01-01T${start}:00Z`);
  const stop = new Date(`1970-01-01T${end}:00Z`);
  while (cur < stop) {
    slots.push(cur.toISOString());
    cur = new Date(cur.getTime() + dur * 60000);
  }
  return slots;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ params?: string[] }> }
) {
  const { params } = await context.params;
  const segments = params ?? [];

  // 1) GET /api/doctors
  if (segments.length === 0) {
    return NextResponse.json(doctors);
  }

  // 2) GET /api/doctors/:id
  const [docId, sub] = segments;
  const doc = doctors.find((d) => d.id === docId);
  if (!doc) {
    return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
  }
  if (segments.length === 1) {
    return NextResponse.json(doc);
  }

  // 3) GET /api/doctors/:id/slots
  if (sub === 'slots') {
    const slots = makeSlots(
      doc.workingHours.start,
      doc.workingHours.end,
      doc.slotDuration
    );
    return NextResponse.json({ doctorId: doc.id, slots });
  }

  // 4) GET /api/doctors/:id/occupancy
  if (sub === 'occupancy') {
    const counts: Record<string, number> = {};
    appointments
      .filter((a) => a.doctorId === doc.id)
      .forEach((a) => {
        const slot = new Date(a.time).toISOString();
        counts[slot] = (counts[slot] || 0) + 1;
      });
    const occupancy = Object.entries(counts).map(([slot, count]) => ({ slot, count }));
    return NextResponse.json({ doctorId: doc.id, occupancy });
  }

  return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ params?: string[] }> }
) {
  const { params } = await context.params;
  const segments = params ?? [];

  // POST /api/doctors  (create new doctor)
  if (segments.length === 0) {
    const payload = (await req.json()) as Omit<Doctor, 'id'>;
    const newDoc: Doctor = { id: `d${doctors.length + 1}`, ...payload };
    doctors.push(newDoc);
    return NextResponse.json(newDoc, { status: 201 });
  }

  return NextResponse.json({ error: 'Invalid POST endpoint' }, { status: 400 });
}
