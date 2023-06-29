import getCurrentUser from '../actions/getCurrentUser';
import Image from 'next/image';
import Background from '@/public/images/signup_wallpaper.webp';
import ProviderLoginButton from './ProviderLoginButton';
import { redirect } from 'next/navigation';

export default async function Login() {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    redirect('/dashboard/library');
  }

  return (
    <div className="w-screen h-screen flex bg-base text-white">
      <div className="w-1/2 relative h-screen shadow-2xl hidden md:flex justify-center">
        <Image
          alt="Beautiful Portrait Photo"
          quality={100}
          priority={true}
          src={Background}
          className="h-full object-cover"
        />
        <h1 className="absolute text-7xl font-bold top-[15%]">Welcome.</h1>
        <h3 className="absolute text-xl top-[28%]">Fast. Secure. Bolt.</h3>
      </div>
      <div className="grow h-screen flex justify-center items-center">
        <div className="w-2/3 rounded shadow-xl bg-accent-100 py-2 min-w-[400px]">
          <div className="flex justify-between items-center m-4 mx-6">
            <h2 className="text-lg font-semibold">Existing Members</h2>
            <button>
              <p className="text-gray-400 hover:text-gray-300">Guest Access</p>
            </button>
          </div>
          <hr className="border-1 w-full border-accent-200 my-2" />
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col gap-3 items-center justify-center p-4 w-full mx-2">
              <ProviderLoginButton providerName="Google" />
              <ProviderLoginButton providerName="Facebook" />
              <ProviderLoginButton providerName="Github" />
              <ProviderLoginButton providerName="Instagram" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
