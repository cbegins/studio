import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {Roboto_Mono} from 'next/font/google';
import {metadata} from './metadata';
import {Nunito} from "next/font/google";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${robotoMono.variable} ${nunito.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
