'use client';

import { useState, ChangeEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function Searchbar() {
  const [input, setInput] = useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  return (
    <div className="mx-2 min-w-[200px] w-3/12 bg-accent-300 p-2 rounded-full flex items-center pl-4">
      <SearchIcon color="info" />
      <form className="mx-2">
        <input
          className="bg-accent-300 px-2 placeholder-white outline-none text-sm max-w-md w-full"
          onChange={handleChange}
          type="text"
          placeholder="Search"
          value={input}
        />
      </form>
    </div>
  );
}
