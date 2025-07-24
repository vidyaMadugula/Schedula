import { doctors, type Doctor } from '../data/doctors';
export async function getDoctors(): Promise<Doctor[]> {
  await new Promise(r => setTimeout(r, 300));
  return doctors;
}