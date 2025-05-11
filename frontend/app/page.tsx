'use client';

import { useEffect, useState } from 'react';
import InspirationCard from "./components/InspirationCard";
import { fetchInspirations } from './utils/api';

export default function HomePage() {
  const [inspirations, setInspirations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInspirations()
      .then(setInspirations)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
   <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {loading ? (
        <p className="text-center">Loading inspirations...</p>
      ) : inspirations.length === 0 ? (
        <p className="text-center text-gray-500">No inspirations yet. Add some!</p>
      ) : (
        inspirations.map((item: any) => (
          <InspirationCard key={item.slug} {...item} />
        ))
      )}
    </div>
  );
}
