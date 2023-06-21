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
      <AuthContextProvider user={currentUser.user as IUser}>
        <ImagesContextProvider>
          <div className="bg-base text-white">
            <Sidebar />
            <div className="relative pl-72 h-screen">
              <Header />
              <div className="p-4 pt-52 h-full">{children}</div>
            </div>
          </div>
        </ImagesContextProvider>
      </AuthContextProvider>
    );
  } else {
    redirect('/login');
  }
}
