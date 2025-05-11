import './styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'SaaS Inspiration Gallery',
  description: 'Discover top SaaS web design ideas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
