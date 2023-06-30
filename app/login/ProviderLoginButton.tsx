'use client';

import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import GithubIcon from '@mui/icons-material/Github';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function ProviderLoginButton({
  providerName,
}: {
  providerName: string;
}) {
  function getProviderIcon() {
    switch (providerName) {
      case 'Google':
        return (
          <Image
            src="/images/google.svg"
            alt="Not found image"
            width={25}
            height={25}
            className="object-contain ml-2"
          />
        );
      case 'Facebook':
        return (
          <Image
            src="/images/facebook.svg"
            alt="Not found image"
            width={25}
            height={25}
            className="object-contain rounded-md bg-white ml-2"
          />
        );
      case 'Github':
        return (
          <Image
            src="/images/github.svg"
            alt="Not found image"
            width={25}
            height={25}
            className="object-contain ml-2"
          />
        );
    }
  }

  function getProviderPayload() {
    switch (providerName) {
      case 'Google':
        return 'google';
      case 'Facebook':
        return 'facebook';
      case 'Instagram':
        return 'instagram';
      case 'Github':
        return 'github';
    }
  }

  return (
    <button
      className="bg-accent-300 w-5/6 p-3 rounded shadow-md flex transition hover:-translate-y-1 hover:shadow-2xl"
      onClick={() =>
        signIn(getProviderPayload(), {
          callbackUrl: 'http://localhost:3000/dashboard/library',
        })
      }
    >
      <div className="w-12">{getProviderIcon()}</div>
      <div className="w-full">
        <p className="font-semibold flex ml-[18%]">Login with {providerName}</p>
      </div>
    </button>
  );
}
