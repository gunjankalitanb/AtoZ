'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [urls, setUrls] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/inspirations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: urls.split('\n').map(u => u.trim()).filter(Boolean) }),
      });
      if (!res.ok) throw new Error('Backend error');
      const data = await res.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Submit Website URLs</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border rounded-md shadow-sm mb-4"
          rows={5}
          placeholder="One URL per line..."
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
      {results.length > 0 && (
        <ul className="space-y-3">
          {results.map((item: any) => (
            <li key={item.slug} className="border p-3 rounded bg-white shadow-sm">
              <strong>{item.title}</strong><br />
              <small>{item.websiteLink}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
