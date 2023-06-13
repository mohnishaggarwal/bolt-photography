import { Inter } from 'next/font/google';
import Homelayout from './Homelayout';
import AuthContextProvider from '../contexts/AuthContextProvider';
import IUser from '../interfaces/user';
import getCurrentUser from '../actions/getCurrentUser';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  console.log(currentUser);

  if (currentUser && currentUser.user) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <AuthContextProvider user={currentUser.user as IUser}>
            <Homelayout />
            {children}
          </AuthContextProvider>
        </body>
      </html>
    );
  } else {
    redirect('/login');
  }
}
