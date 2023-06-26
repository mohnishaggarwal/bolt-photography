import AuthContextProvider from '../contexts/auth/AuthContextProvider';
import IUser from '../interfaces/user';
import getCurrentUser from '../actions/getCurrentUser';
import { redirect } from 'next/navigation';
import ImagesContextProvider from '../contexts/images/ImagesContextProvider';
import LayoutClient from './LayoutHome';
import MobileContextProvider from '../contexts/mobile/MobileContextProvider';

async function fetchImages(userEmail: string) {
  const url = `${process.env.API_BASEURL}/images`;

  const params: { [key: string]: string } = {
    email: userEmail,
  };

  const queryString: string = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join('&');

  const fullUrl: string = `${url}?${queryString}`;

  const res = await fetch(fullUrl);

  if (!res.ok) {
    throw new Error('Error occurred when fetching posts');
  }
  return res.json();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (currentUser && currentUser.user && currentUser.user.email) {
    const data = await fetchImages(currentUser?.user?.email);
    // console.log(data);

    return (
      <AuthContextProvider user={currentUser.user as IUser}>
        {/* <ImagesContextProvider>
          <MobileContextProvider>
            <LayoutClient>{children}</LayoutClient>
          </MobileContextProvider>
        </ImagesContextProvider> */}
      </AuthContextProvider>
    );
  } else {
    redirect('/login');
  }
}
