'use client';

import BoltIcon from '@mui/icons-material/Bolt';
import Searchbar from './Searchbar';
import ProfileIcon from './ProfileIcon';

export default function AppHeader() {
  return (
    <>
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
    </>
  );
}
