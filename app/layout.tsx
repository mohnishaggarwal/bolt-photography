import './globals.css';
import { Inter } from 'next/font/google';
import NavigationLinker from './NavigationLinker';

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
  const signedIn = false;

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationLinker signedIn={signedIn} />
        {children}
      </body>
    </html>
  );
}
