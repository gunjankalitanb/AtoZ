'use client';
import { useState } from 'react';

export default function AuthForm({ type }: { type: 'login' | 'register' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const body: any = { email, password };
      if (type === 'register') {
        if (password !== confirm) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        body.confirmPassword = confirm;
      }

       const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error(await res.text());
      alert(`${type === 'login' ? 'Logged in' : 'Registered'} successfully`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-md mx-auto p-6 bg-white shadow rounded space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-center capitalize">{type}</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {type === 'register' && (
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-2 rounded"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
      )}
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700" disabled={loading}>
        {loading ? 'Please wait...' : type === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
}
