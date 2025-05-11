'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/admin/login');
  }, [router]);

  return (
    <div className="max-w-4xl mx-auto text-center mt-8">
      <h1 className="text-2xl font-bold mb-4">👋 Welcome, Admin</h1>
      <p className="text-gray-700">Use the admin menu to manage submissions and users.</p>
    </div>
  );
}
