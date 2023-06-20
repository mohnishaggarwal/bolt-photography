import './globals.css';
import { Inter } from 'next/font/google';
import classNames from 'classnames';

import GlobalProviders from './GlobalProviders';

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
      <body className={classNames('bg-base', inter.className)}>
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
