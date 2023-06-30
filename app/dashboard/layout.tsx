import AuthContextProvider from '../contexts/auth/AuthContextProvider';
import IUser from '../interfaces/user';
import { fetchUserUsage, getCurrentUser } from '../actions/user';
import { redirect } from 'next/navigation';
import ImagesContextProvider from '../contexts/images/ImagesContextProvider';
import LayoutClient from './LayoutHome';
import { fetchImages } from '@/app/actions/image';
import MobileContextProvider from '../contexts/mobile/MobileContextProvider';
import UsageContextProvider from '../contexts/usage/UsageContextProvider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (currentUser && currentUser.user && currentUser.user.email) {
    const fetchedImages = await fetchImages(currentUser?.user?.email);
    const percentStorageUsed = await fetchUserUsage(currentUser?.user?.email);

    return (
      <AuthContextProvider user={currentUser.user as IUser}>
        <ImagesContextProvider fetchedImages={fetchedImages.image_urls}>
          <MobileContextProvider>
            <UsageContextProvider usagePercentage={percentStorageUsed}>
              <LayoutClient>{children}</LayoutClient>
            </UsageContextProvider>
          </MobileContextProvider>
        </ImagesContextProvider>
      </AuthContextProvider>
    );
  } else {
    redirect('/login');
  }
}
