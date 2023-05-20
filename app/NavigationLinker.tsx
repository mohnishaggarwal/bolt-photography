'use client';

import { useRouter } from 'next/navigation';

export default function NavigationLinker({ signedIn }: { signedIn: boolean }) {
  const router = useRouter();

  if (!signedIn) {
    router.push('/login');
  } else {
    router.push('/dashboard/library');
  }
  return <></>;
}
