export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatarUrl: string;
  bio: string;
  slots: Record<string, string[]>;
}

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Kumar Das',
    specialty: 'Ophthalmologist - Dombivali',
    avatarUrl: '/avatars/doc1.jpg',
    bio: 'MBBS, MS (Sankara Nethralaya). 15+ yrs in cataract & glaucoma.',
    slots: {
      '2023-07-13': ['09:30-09:45', '10:00-10:15', '10:30-10:45'],
      '2023-07-14': ['11:00-11:15']
    }
  },
  {
    id: '2',
    name: 'Dr. Anjali Rao',
    specialty: 'Pediatrician - Andheri',
    avatarUrl: '/avatars/doc2.jpg',
    bio: 'MBBS, DCH (AIIMS). 10 yrs in child health & vaccinations.',
    slots: {
      '2023-07-13': ['09:00-09:15', '10:30-10:45'],
      '2023-07-14': ['13:00-13:15', '14:00-14:15']
    }
  },
  {
    id: '3',
    name: 'Dr. Rohit Menon',
    specialty: 'Orthopedic Surgeon - Powai',
    avatarUrl: '/avatars/doc3.jpg',
    bio: 'MBBS, MS Ortho. 12 yrs in trauma & joint replacement surgery.',
    slots: {
      '2023-07-13': ['12:00-12:15', '12:30-12:45'],
      '2023-07-14': ['10:00-10:15']
    }
  },
  {
    id: '4',
    name: 'Dr. Sneha Iyer',
    specialty: 'Dermatologist - Navi Mumbai',
    avatarUrl: '/avatars/doc4.jpg',
    bio: 'MD Dermatology. 8 yrs in acne, pigmentation & hair loss.',
    slots: {
      '2023-07-13': ['11:00-11:15', '11:30-11:45'],
      '2023-07-14': ['15:00-15:15']
    }
  },
  {
    id: '5',
    name: 'Dr. Arvind Shetty',
    specialty: 'Cardiologist - Bandra',
    avatarUrl: '/avatars/doc5.jpg',
    bio: 'DM Cardiology (KEM). 18 yrs in cardiac care & ECG.',
    slots: {
      '2023-07-13': ['09:00-09:15', '09:30-09:45'],
      '2023-07-14': ['16:00-16:15']
    }
  },
  {
    id: '6',
    name: 'Dr. Fatima Khan',
    specialty: 'ENT Specialist - Thane',
    avatarUrl: '/avatars/doc6.jpg',
    bio: 'MBBS, MS ENT. 9 yrs in sinus & hearing disorders.',
    slots: {
      '2023-07-13': ['13:00-13:15', '14:00-14:15'],
      '2023-07-14': ['10:30-10:45']
    }
  },
  {
    id: '7',
    name: 'Dr. Vikram Joshi',
    specialty: 'Psychiatrist - Chembur',
    avatarUrl: '/avatars/doc7.jpg',
    bio: 'MD Psychiatry. 11 yrs in anxiety, depression & counseling.',
    slots: {
      '2023-07-13': ['15:00-15:15', '15:30-15:45'],
      '2023-07-14': ['12:00-12:15']
    }
  },
  {
    id: '8',
    name: 'Dr. Neha Bhat',
    specialty: 'Gynecologist - Vashi',
    avatarUrl: '/avatars/doc8.jpg',
    bio: 'MBBS, DGO. 14 yrs in pregnancy care & PCOS treatment.',
    slots: {
      '2023-07-13': ['10:00-10:15', '11:00-11:15'],
      '2023-07-14': ['17:00-17:15']
    }
  }
];
