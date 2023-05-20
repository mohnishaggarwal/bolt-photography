'use client';

import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function ProviderLoginButton({
  providerName,
}: {
  providerName: string;
}) {
  function getProviderIcon(providerName: string) {
    switch (providerName) {
      case 'Google':
        return <GoogleIcon />;
      case 'Facebook':
        return <FacebookIcon />;
      case 'Instagram':
        return <InstagramIcon />;
      case 'Linkedin':
        return <LinkedInIcon />;
    }
  }

  return (
    <button className="bg-accent-300 w-5/6 p-3 rounded shadow-md flex transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="w-12">{getProviderIcon(providerName)}</div>
      <div className="w-full">
        <p className="font-semibold flex ml-[18%]">Login with {providerName}</p>
      </div>
    </button>
  );
}
