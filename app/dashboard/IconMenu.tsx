'use client';

import { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import { useImagesContext } from '../contexts/images/ImagesContext';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import IImage from '../interfaces/image';
import FeatureInProgressModal from '../global_components/modals/FeatureInProgressModal';

export default function IconMenu() {
  const { state, dispatch } = useImagesContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClickable, setIsClickable] = useState(true);
  const pathname = usePathname();
  const currentPath = pathname.split('/').pop() || '';

  const handleTrash = () => {
    dispatch({ type: 'TRASH_IMAGES' });
  };

  const handleFavorite = () => {
    dispatch({ type: 'FAVORITE_IMAGES' });
  };

  const handleUnfavorite = () => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES' });
  };

  const handleDownload = () => {
    state.selectedImages.forEach((image: IImage) => {
      const url = URL.createObjectURL(image.file);

      const link = document.createElement('a');
      link.href = url;

      // Set the download attribute with the filename
      link.setAttribute('download', image.file.name);

      // Programmatically trigger a click on the link to initiate the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the object URL after download
      URL.revokeObjectURL(url);
      dispatch({ type: 'RESET_SELECTED' });
    });
  };

  useEffect(() => {
    setIsClickable(state.selectedImages.length !== 0);
  }, [state.selectedImages]);

  return (
    <div className="flex items-center z-10 justify-center">
      <button
        className={classNames(' rounded-full p-1', {
          'hover:bg-accent-300': isClickable,
          'pointer-events-none': !isClickable,
        })}
        onClick={() => setIsModalOpen(true)}
      >
        <VisibilityOffIcon
          className={classNames({
            'text-white': isClickable,
            'text-accent-200': !isClickable,
          })}
        />
      </button>
      <button
        onClick={handleDownload}
        className={classNames('rounded-full p-1', {
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
        className={classNames('rounded-full p-1', {
          'hover:bg-accent-300': isClickable,
          'pointer-events-none': !isClickable,
        })}
        onClick={
          currentPath === 'favorites' ? handleUnfavorite : handleFavorite
        }
      >
        {currentPath === 'favorites' ? (
          <FavoriteIcon
            className={classNames({
              'text-white': isClickable,
              'text-accent-200': !isClickable,
            })}
          />
        ) : (
          <FavoriteBorderIcon
            className={classNames({
              'text-white': isClickable,
              'text-accent-200': !isClickable,
            })}
          />
        )}
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
      <FeatureInProgressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
