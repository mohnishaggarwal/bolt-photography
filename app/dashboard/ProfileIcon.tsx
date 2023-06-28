'use client';

import { useState } from 'react';
import { useAuthContext } from '../contexts/auth/AuthContext';
import Image from 'next/image';
import classNames from 'classnames';
import { signOut } from 'next-auth/react';

const ProfileOptions = ['Settings', 'Sign Out'];

export default function ProfileIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext();

  function handleSelect(option: string) {
    switch (option) {
      case 'Sign Out':
        signOut();
        break;
      default:
        // TODO - add option for settings
        break;
    }
  }

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <Image
          width={40}
          height={40}
          alt="profile picture"
          src={user.image}
          className="rounded-full"
        />
      </button>
      <div
        className={classNames(
          'absolute bg-accent-300 z-50 top-[92%] mt-1 w-fit rounded shadow-lg transition-opacity right-0.5',
          { 'opacity-0': !isOpen, 'opactiy-100': isOpen }
        )}
      >
        {ProfileOptions.map((option, index) => (
          <div key={index} className="m-1">
            <button
              onClick={() => handleSelect(option)}
              className="hover:bg-accent-200 rounded w-full flex items-start p-2"
            >
              <p className="text-sm whitespace-nowrap">{option}</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
