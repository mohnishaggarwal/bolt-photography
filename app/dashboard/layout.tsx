import { Inter } from 'next/font/google';
import Header from './Header';
import Sidebar from './Sidebar';
import AuthContextProvider from '../contexts/auth/AuthContextProvider';
import IUser from '../interfaces/user';
import getCurrentUser from '../actions/getCurrentUser';
import { redirect } from 'next/navigation';
import ImagesContextProvider from '../contexts/images/ImagesContextProvider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (currentUser && currentUser.user) {
    return (
      <html lang="en">
        <body>
          <AuthContextProvider user={currentUser.user as IUser}>
            <ImagesContextProvider>
              <div className="bg-base text-white">
                <Sidebar />
                <div className="relative pl-72 h-screen">
                  <Header />
                  <div className="pt-48 h-full">{children}</div>
                </div>
              </div>
            </ImagesContextProvider>
          </AuthContextProvider>
        </body>
      </html>
    );
  } else {
    redirect('/login');
  }
}
