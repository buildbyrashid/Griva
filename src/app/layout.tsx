import type { Metadata } from 'next';
import './globals.css';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import CartDrawer from '@/components/layout/CartDrawer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import LiveSalesNotification from '@/components/ui/LiveSalesNotification';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Griva — Next-Gen Tech Starts Here | Premium Gadgets Qatar & GCC',
  description:
    'Shop premium gadgets, electronics & Apple products at the best prices in Qatar & GCC. Flash sales, free delivery, and WhatsApp ordering. AirPods, Samsung, Sony, PlayStation & more.',
  keywords: 'gadgets Qatar, electronics GCC, AirPods Qatar, Apple accessories, gaming Qatar, flash sale electronics',
  openGraph: {
    title: 'Griva — Next-Gen Tech Starts Here',
    description: 'Premium gadgets. Unbeatable prices. Free delivery Qatar & GCC.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dark-bg antialiased">
        <AnnouncementBar />
        <Navbar />
        <CartDrawer />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <MobileNav />
        <WhatsAppButton />
        <LiveSalesNotification />
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: '#161A22',
              border: '1px solid #2A2F3A',
              color: '#FFFFFF',
            },
          }}
        />
      </body>
    </html>
  );
}
