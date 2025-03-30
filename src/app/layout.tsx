import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './styles/globals.css';
import { ConvexClientProvider } from '@/components/convex-client-provider';
import { Modals } from '@/components/modals';
import { Toaster } from '@/components/ui/sonner';
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type React from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Zephara',
  description: 'Chat for Zephyr',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <script
            defer
            src="https://analytics-umami.zephyyrr.in/script.js"
            data-website-id="3dfa1132-3a2a-4a46-bce3-993b5794c47b"
          />
          <ConvexClientProvider>
            <Toaster />
            <Modals />
            {children}
            <SpeedInsights />
            <Analytics />
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
