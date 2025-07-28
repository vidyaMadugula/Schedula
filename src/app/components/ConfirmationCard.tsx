'use client';
import { Sparkles } from 'lucide-react';

type ConfirmationCardProps = {
  token: string;
  onBookAnother: () => void;
};

export default function ConfirmationCard({ token, onBookAnother }: ConfirmationCardProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="bg-green-100 border border-green-300 p-8 rounded-lg text-center shadow-md w-full max-w-md">
       
<h1 className="flex items-center gap-3 text-3xl font-bold mb-4 text-blue-700 relative">
  <Sparkles className="w-10 h-10 text-blue-400 animate-pulse" />
  <span className="relative z-10">Booking Confirmed!</span>
</h1>

        <p className="text-gray-700 mb-4">
          Your appointment has been successfully scheduled.
        </p>

        <div className=" p-4 rounded shadow-inner mt-4">
          <span className="block text-sm text-gray-500 mb-1">Your token number is:</span>
          <span className="text-4xl font-bold text-blue-700 tracking-wider">{token}</span>
        </div>
        <button
        onClick={onBookAnother}
        className="mt-8 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Book Another
      </button>
      </div>

      
    </div>
  );
}
