import { getCurrentUser } from '../actions/user';
import { redirect } from 'next/navigation';
import AuthenticationBlock from './AuthenticationBlock';

export default async function Login() {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    redirect('/dashboard/library');
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-evenly items-center bg-base text-white px-24">
      <div>
        <h1 className="text-5xl font-bold text-highlight inline">Bolt&nbsp;</h1>
        <h1 className="text-5xl font-bold mt-2 inline">Uploads</h1>
        <h1 className="text-3xl font-medium mt-8">
          Your AI Image Upload Platform.
        </h1>
      </div>
      <AuthenticationBlock />
    </div>
  );
}
