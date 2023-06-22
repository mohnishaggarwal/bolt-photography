import AuthContextProvider from '../contexts/auth/AuthContextProvider';
import IUser from '../interfaces/user';
import getCurrentUser from '../actions/getCurrentUser';
import { redirect } from 'next/navigation';
import ImagesContextProvider from '../contexts/images/ImagesContextProvider';
import LayoutClient from './LayoutHome';
import SidebarContextProvider from '../contexts/sidebar/SidebarContextProvider';

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
          <SidebarContextProvider>
            <LayoutClient>{children}</LayoutClient>
          </SidebarContextProvider>
        </ImagesContextProvider>
      </AuthContextProvider>
    );
  } else {
    redirect('/login');
  }
}
