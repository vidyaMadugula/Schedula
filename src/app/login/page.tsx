'use client';
import LoginForm from '../../components/LoginForm';
import OTPForm from '../../components/OTPForm';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const step = useSearchParams().get('step') || 'login';
  return step === 'otp' ? <OTPForm/> : <LoginForm/>;
}