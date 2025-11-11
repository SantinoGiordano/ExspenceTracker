'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_ROUTES } from '@/app/utils/routes';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const res = await fetch(`${API_ROUTES}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Signup failed');
      return;
    }

    setSuccess('Account created successfully! Redirecting...');
    setTimeout(() => router.push('/'), 1500); // redirect after success
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-6 text-green-600">Sign Up</h1>
      <form onSubmit={handleSignup} className="flex flex-col w-80 space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input input-bordered"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input input-bordered"
          required
        />

        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}

      <p className="mt-6 text-gray-600">
        Already have an account?{" "}
        <button
          className="text-green-600 underline hover:cursor-pointer" 
          onClick={() => router.push('/')}
        >
          Log in
        </button>
      </p>
    </main>
  );
}
