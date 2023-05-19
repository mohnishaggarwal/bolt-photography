'use client';

import BoltIcon from '@mui/icons-material/Bolt';
import Searchbar from './Searchbar';

export default function Header() {
  return (
    <div className="w-full h-16 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center">
          <BoltIcon color="secondary" fontSize="large" />
          <p className="text-3xl">Bolt Photography</p>
        </div>
        <Searchbar />
      </div>
    </div>
  );
}
