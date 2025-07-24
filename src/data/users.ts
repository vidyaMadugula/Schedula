
// data/users.ts

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

// Mock users for authentication flow
export const users: User[] = [
  {
    id: 'u1',
    name: 'Vidya',
    email: 'vidya@email.com',
    avatarUrl: '/avatars/user1.jpg'
  },
  
];
