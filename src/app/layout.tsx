import type {Metadata} from 'next';
import {Nunito} from "next/font/google";
import './globals.css';
import {Toaster} from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'HackBegin',
  description: 'Your hacking journey starts here.',
};

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
    <html lang="en" className={nunito.variable}>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
