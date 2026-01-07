'use client';

import React, { JSX, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage(): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:9090/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data?.role === 'CUSTOMER') {
          // customer home currently implemented at /home
          router.replace('/home');
        } else if (data?.role === 'ADMIN') {
          // admin home not implemented yet — redirect to /home for now
          router.replace('/home');
        } else {
          router.replace('/');
        }
      } else {
        const errorMessage =
          data?.error || 'Something went wrong. Please try again.';
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      setError(err?.message ?? 'Unexpected error occurred');
    }
  };

  return (
    <div className="page-layout">
      <div className="page-container">
        <div className="form-container">
          <h1 className="form-title">Login</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSignIn} className="form-content">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <button type="submit" className="form-button">
              Sign In
            </button>
          </form>

          <div className="form-footer">
            <Link href="/register" className="form-link">
              New User? Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
