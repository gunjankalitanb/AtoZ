import Link from 'next/link';

export default function Header() {
  return (
     <header className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white sticky top-0 z-50 shadow-md">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold tracking-tight">🎨 SaaS Inspiration</h1>
      <nav className="space-x-4">
        <Link href="/" className="hover:underline">Home</Link>
        <a href="/admin" className="hover:underline">Admin</a>
      </nav>
    </div>
  </header>
  );
}
