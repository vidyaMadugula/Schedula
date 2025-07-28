'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';

export default function OTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const inputs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.every((digit) => digit)) {
      router.push('/doctors');
    } else {
      alert('Please enter all 4 digits');
    }
  };

  return (
   <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
  {/* Back button */}
  <div className="absolute top-4 left-4">
    <button onClick={() => router.back()}>
      <ChevronLeft className="h-6 w-6 text-black" />
    </button>
  </div>

  {/* OTP content inside a card */}
  <div className="w-full h-full max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-sm text-center space-y-5 p-16">
    <h1 className="text-xl font-semibold">OTP Code Verification</h1>
    <p className="text-sm text-gray-600">
      Code has been sent to <span className="font-medium">+91 98******87</span>
    </p>

    {/* OTP input fields */}
    <div className="flex justify-between gap-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            if (el) inputs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={`w-12 h-12 text-center text-xl border rounded-lg ${
            digit ? 'border-blue-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
      ))}
    </div>

    {/* Resend timer */}
    <p className="text-sm text-gray-500">
      Resend code in <span className="text-blue-500">{timer}s</span>
    </p>

    {/* Verify button */}
    <button
      onClick={handleVerify}
      className="w-full bg-sky-500 text-white font-medium py-2 rounded-md hover:bg-sky-600 transition"
    >
      Verify
    </button>
  </div>
</div>

  );
}
