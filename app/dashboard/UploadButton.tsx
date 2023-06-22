'use client';

import { ChangeEvent } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useImagesContext } from '@/app/contexts/images/ImagesContext';

export default function UploadButton() {
  const { dispatch } = useImagesContext();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    // TODO - add an error modal here!
    const selectedImages = Array.from(fileList!).filter((file) =>
      /\.(jpg|png)$/i.test(file.name)
    );

    dispatch({ type: 'ADD_IMAGES', payload: selectedImages });
  };

  return (
    <label className="w-3/5 min-w-[150px] z-20 bg-accent-300 hover:bg-accent-200 rounded-full shadow-lg py-2 px-4 text-center text-white cursor-pointer">
      <div className="flex justify-evenly items-center w-full my-1">
        Add New
        <AddIcon color="secondary" fontSize="large" />
      </div>
      <input
        type="file"
        multiple
        accept=".png, .jpg"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
}
