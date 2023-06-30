import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/actions/auth';

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (_) {
    return null;
  }
}

export async function fetchUserUsage(email: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASEURL}/usage`);

  url.searchParams.append('email', email);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error('Error occurred when fetching usage');
  }
  return res.json();
}
