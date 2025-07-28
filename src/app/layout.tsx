import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Schedula',
  description: '',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
