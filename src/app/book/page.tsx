


// app/book/page.tsx
import { Suspense } from 'react';
import BookClient from '../../components/BookClient';

export default function BookPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BookClient />
    </Suspense>
  );
}
