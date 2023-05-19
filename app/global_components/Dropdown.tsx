'use client';

import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import classNames from 'classnames';

const MediaOptions = ['Photos', 'Videos', 'All Files'];

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('All Files');

  function handleOpenClick() {
    setIsOpen(!isOpen);
  }

  function handleSelect(option: string) {
    setSelected(option);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={handleOpenClick}
        className="bg-accent-300 hover:bg-accent-200 shadow-lg px-2 py-1 rounded flex justify-between items-center min-w-[6rem]"
      >
        <p className="text-sm">{selected}</p>
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </button>
      <div
        className={classNames(
          'absolute bg-accent-300 top-full mt-1 w-full rounded shadow-lg transition-opacity',
          { 'opacity-0': !isOpen, 'opactiy-100': isOpen }
        )}
      >
        {MediaOptions.map((option, index) => (
          <>
            {option !== selected && (
              <button
                onClick={() => handleSelect(option)}
                key={index}
                className="hover:bg-accent-200 rounded w-full flex items-start p-2"
              >
                <p className="text-sm">{option}</p>
              </button>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
