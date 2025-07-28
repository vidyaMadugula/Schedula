export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  workingHours: { start: string; end: string };
  slotDuration: number;
  imageUrl: string;
  availableToday: boolean;
  experience: number; // years of experience
  about: string;      // short description about the doctor
}



export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  time: string; // ISO timestamp
}
