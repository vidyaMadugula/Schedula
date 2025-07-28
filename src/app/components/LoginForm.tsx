// src/components/LoginForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

type LoginFormProps = {
  redirectTo?: string;
};

export default function LoginForm({ redirectTo = '/otp' }: LoginFormProps) {
  const { register, handleSubmit } = useForm<{ email: string; password: string }>();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  // const onSubmit = async (data: { email: string; password: string }) => {
  //   router.push(redirectTo);
  // };
  const onSubmit = async (data: { email: string; password: string }) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.error); // Show error message like "Invalid credentials"
      return;
    }

    const result = await response.json();
    console.log('Login success:', result.token);
    router.push(redirectTo);
  } catch (err) {
    alert('Something went wrong. Please try again.');
    console.error(err);
  }
};


  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-blue-700">
          Welcome to Schedula 👋
        </h1>
        <p className="text-center text-sm text-gray-500">Patient Login</p>

        <label className="block">
          <span className="text-sm text-gray-700">Email</span>
          <input
            {...register('email')}
            type="email"
            required
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-100"
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-700">Password</span>
          <input
            {...register('password')}
            type="password"
            required
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-100"
          />
        </label>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-150"
        >
          Login
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-400 my-2">
          <hr className="flex-1 border-gray-300" />
          or
          <hr className="flex-1 border-gray-300" />
        </div>

        <button
          type="button"
          className="w-full py-2 flex items-center justify-center gap-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          New to Schedula?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
