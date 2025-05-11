const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchInspirations = async () => {
  const res = await fetch(`${BASE}/inspirations`);
  if (!res.ok) throw new Error('Failed to fetch inspirations');
  return res.json();
};

export const fetchInspirationById = async (slug: string) => {
  const res = await fetch(`${BASE}/inspirations/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch inspiration');
  return res.json();
};
