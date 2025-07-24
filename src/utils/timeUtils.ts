// utils/timeUtils.ts

export function generateTimeSlots(start: string, end: string): string[] {
  const slots: string[] = [];
  let [h, m] = start.split(':').map(Number);
  const [endH, endM] = end.split(':').map(Number);

  while (h < endH || (h === endH && m < endM)) {
    let endMin = m + 15;
    let eh = h;
    let em = endMin;

    if (endMin >= 60) {
      eh = h + 1;
      em = endMin % 60;
    }

    const format = (val: number) => String(val).padStart(2, '0');
    slots.push(`${format(h)}:${format(m)}-${format(eh)}:${format(em)}`);

    // Add a 15-minute break before next slot
    m = em + 15;
    if (m >= 60) {
      h = eh + 1;
      m = m % 60;
    } else {
      h = eh;
    }
  }

  return slots;
}


export function getNextNDates(n: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}
