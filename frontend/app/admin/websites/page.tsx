'use client';
import { useEffect, useState } from 'react';
import WebsiteTable from '@/components/WebsiteTable';

export default function WebsiteTablePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/inspirations`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">📋 Submitted Websites</h1>
      {loading ? <p>Loading...</p> : <WebsiteTable data={data} />}
    </div>
  );
}
