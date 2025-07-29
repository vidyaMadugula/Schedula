import { NextRequest, NextResponse } from 'next/server';
import rawAppointments from '@/data/appointments.json';
import type { Appointment } from '@/types';
import { writeFileSync } from 'fs';
import { join } from 'path';

const appointments = rawAppointments as Appointment[];

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const doctorId = url.searchParams.get('doctorId');
  const date = url.searchParams.get('date');

  if (id) {
    return NextResponse.json(appointments.filter((a) => a.id === id));
  }
  if (doctorId && date) {
    return NextResponse.json(
      appointments.filter(
        (a) =>
          a.doctorId === doctorId && a.time.startsWith(date)
      )
    );
  }
  return NextResponse.json(appointments);
}

export async function POST(req: NextRequest) {
  const { doctorId, patientName, time } = (await req.json()) as Omit<Appointment, 'id'>;
  const newAppt: Appointment = {
    id: `a${appointments.length + 1}`,
    doctorId,
    patientName,
    time,
  };
  appointments.push(newAppt);
  if (process.env.NODE_ENV === 'development') {
  writeFileSync(
    join(process.cwd(), 'src/data/appointments.json'),
    JSON.stringify(appointments, null, 2)
  );
}

  return NextResponse.json(newAppt, { status: 201 });
}
