'use client';

import BoltIcon from '@mui/icons-material/Bolt';
import Searchbar from './Searchbar';
import ProfileIcon from './ProfileIcon';
import Dropdown from '@/app/global_components/Dropdown';
import IconMenu from './IconMenu';

export default function Header() {
  return (
    <div className="fixed w-[calc(100%-18rem)] h-52 z-10 top-0 right-0 bg-base">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center">
            <BoltIcon color="secondary" fontSize="large" />
            <h1 className="text-3xl">Bolt Photography</h1>
          </div>
          <Searchbar />
          <ProfileIcon />
        </div>
      </div>
      <hr className="border-1 w-full border-accent-100" />
      <div className="w-full px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex min-w-[180px] flex-col w-1/6 items-start">
            <h2 className="text-2xl mb-4">Your Uploads</h2>
            <Dropdown />
          </div>
          <IconMenu />
        </div>
      </div>
      <hr className="border-1 w-full border-accent-100" />
    </div>
  );
}
