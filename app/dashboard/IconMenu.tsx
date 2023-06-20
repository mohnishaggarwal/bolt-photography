'use client';

import { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useImagesContext } from '../contexts/images/ImagesContext';
import classNames from 'classnames';

export default function IconMenu() {
  const { state, dispatch } = useImagesContext();
  const [isClickable, setIsClickable] = useState(true);

  const handleTrash = () => {
    dispatch({ type: 'TRASH_IMAGES' });
  };

  useEffect(() => {
    setIsClickable(state.selectedImages.length !== 0);
  }, [state.selectedImages]);

  return (
    <div className="flex items-center justify-center">
      <button
        className={classNames('z-30 rounded-full p-1', {
          'hover:bg-accent-300': isClickable,
          'pointer-events-none': !isClickable,
        })}
      >
        <VisibilityOffIcon
          className={classNames({
            'text-white': isClickable,
            'text-accent-200': !isClickable,
          })}
        />
      </button>
      <button
        className={classNames('z-30 rounded-full p-1', {
          'hover:bg-accent-300': isClickable,
          'pointer-events-none': !isClickable,
        })}
      >
        <DownloadIcon
          className={classNames({
            'text-white': isClickable,
            'text-accent-200': !isClickable,
          })}
        />
      </button>
      <button
        className={classNames('z-30 rounded-full p-1', {
          'hover:bg-accent-300': isClickable,
          'pointer-events-none': !isClickable,
        })}
      >
        <FavoriteBorderIcon
          className={classNames({
            'text-white': isClickable,
            'text-accent-200': !isClickable,
          })}
        />
      </button>
      <button
        className={classNames('z-30 rounded-full p-1', {
          'hover:bg-accent-300': isClickable,
          'pointer-events-none': !isClickable,
        })}
        onClick={handleTrash}
      >
        <DeleteOutlineIcon
          className={classNames({
            'text-white': isClickable,
            'text-accent-200': !isClickable,
          })}
        />
      </button>
    </div>
  );
}
