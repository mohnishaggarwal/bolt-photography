import { Inter } from 'next/font/google';
import Homelayout from './Homelayout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Bolt',
  description: "Mother's photography platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Homelayout />
        {children}
      </body>
    </html>
  );
}
