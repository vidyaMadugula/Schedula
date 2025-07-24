'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function OTPForm() {
  const [code, setCode] = useState(['','','','']);
  const [timer, setTimer] = useState(60);
  const router = useRouter();

  useEffect(() => {
    if (timer>0) setTimeout(() => setTimer(t => t-1), 1000);
  },[timer]);

  const onVerify = () => router.push('/appointment');
  const onChange = (i: number, v:string) => {
    const c = [...code]; c[i]=v.slice(-1); setCode(c);
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow">
      <h2 className="text-xl mb-4">OTP Verification</h2>
      <div className="flex space-x-2 mb-4">
        {code.map((c,i)=>(
          <input
            key={i} value={c} onChange={e=>onChange(i,e.target.value)}
            className="w-12 h-12 text-center border rounded"
          />
        ))}
      </div>
      <button onClick={onVerify} className="w-full bg-cyan-400 text-white py-2 rounded-lg mb-2">Verify</button>
      {timer>0 ? <p>Resend in {timer}s</p> : <button>Resend Code</button>}
    </div>
  );
}