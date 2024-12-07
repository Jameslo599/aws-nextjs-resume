import type { Metadata } from 'next';
import './globals.css';
import { EB_Garamond } from 'next/font/google';
import Counter from '@/components/counter/Counter';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Cloud Resume',
  description: 'Nextjs resume connected to AWS with sst',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ebGaramond.className} antialiased bg-slate-950`}>
        <Counter />
        {children}
      </body>
    </html>
  );
}
