'use client';

import React from 'react';
import { useImagesContext } from '../contexts/images/ImagesContext';

export default function DeleteMenu() {
  const { dispatch } = useImagesContext();

  return (
    <div className="flex justify-between w-64 text-accent-400">
      <button
        className="hover:bg-accent-100 p-2 rounded-md"
        onClick={() => dispatch({ type: 'RECOVER_IMAGES' })}
      >
        <p className="hover:text-white">Recover</p>
      </button>
      <button
        className="hover:bg-accent-100 p-2 rounded-md"
        onClick={() => dispatch({ type: 'DELETE_IMAGES' })}
      >
        <p className="hover:text-white">Delete</p>
      </button>
      <button
        className="hover:bg-accent-100 p-2 rounded-md z-30"
        onClick={() => dispatch({ type: 'DELETE_ALL_TRASH' })}
      >
        <p className="hover:text-white">Delete All</p>
      </button>
    </div>
  );
}
