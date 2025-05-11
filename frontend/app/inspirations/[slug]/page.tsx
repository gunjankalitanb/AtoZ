'use client';

import { useEffect, useState } from 'react';
import { fetchInspirationById } from '@/app/utils/api';

export default function InspirationDetail({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchInspirationById(params.slug).then(setData).catch(console.error);
  }, [params.slug]);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p>{data.description}</p>
      <a href={data.websiteLink} target="_blank" className="text-blue-600 underline">
        Visit Website
      </a>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.desktopScreenshotUrl && (
          <img src={data.desktopScreenshotUrl} alt="Desktop" className="rounded shadow" />
        )}
        {data.mobileScreenshotUrl && (
          <img src={data.mobileScreenshotUrl} alt="Mobile" className="rounded shadow" />
        )}
      </div>

      <div>
        <h2 className="font-semibold text-lg">Technology Stack</h2>
        <p>{data.technologyStack?.join(", ")}</p>
      </div>

      <div>
        <h2 className="font-semibold text-lg">Color Scheme</h2>
        <div className="flex gap-2">
          {data.colorScheme?.map((color: string, index: number) => (
            <span key={index} className="w-6 h-6 rounded-full" style={{ backgroundColor: color }}></span>
          ))}
        </div>
      </div>
    </div>
  );
}
