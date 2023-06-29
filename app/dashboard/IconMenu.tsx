'use client';

import { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import { useImagesContext } from '../contexts/images/ImagesContext';
import { updateImages } from '@/app/actions/image-actions';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import IImage from '../interfaces/image';
import FeatureInProgressModal from '../global_components/modals/FeatureInProgressModal';
import APICallResult from '../interfaces/api-call-result';
import { useAuthContext } from '../contexts/auth/AuthContext';
import ErrorModal from '../global_components/modals/ErrorModal';

export default function IconMenu() {
  const { user } = useAuthContext();
  const { state, dispatch } = useImagesContext();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClickable, setIsClickable] = useState(true);
  const pathname = usePathname();
  const currentPath = pathname.split('/').pop() || '';

  const handleApiCall = async (updateParam: string): Promise<APICallResult> => {
    const res = await updateImages(
      user.email,
      state.selectedImages.map((img: IImage) => img.name),
      updateParam
    );
    return res;
  };

  const handleTrash = async () => {
    const apiCallResult: APICallResult = await handleApiCall('TRASH');
    if (apiCallResult.wasCallSuccessful) {
      dispatch({ type: 'TRASH_IMAGES' });
    } else {
      setErrorMsg(apiCallResult.errorMsg);
      setIsErrorModalOpen(true);
    }
  };

  const handleFavorite = async () => {
    const apiCallResult: APICallResult = await handleApiCall('FAVORITE');
    if (apiCallResult.wasCallSuccessful) {
      dispatch({ type: 'FAVORITE_IMAGES' });
    } else {
      setErrorMsg(apiCallResult.errorMsg);
      setIsErrorModalOpen(true);
    }
  };

  const handleUnfavorite = async () => {
    const apiCallResult: APICallResult = await handleApiCall('NORMAL');
    if (apiCallResult.wasCallSuccessful) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES' });
    } else {
      setErrorMsg(apiCallResult.errorMsg);
      setIsErrorModalOpen(true);
    }
  };

  const handleDownload = () => {
    state.selectedImages.forEach((image: IImage) => {
      const url = URL.createObjectURL(image.src);

      const link = document.createElement('a');
      link.href = url;

      // Set the download attribute with the filename
      link.setAttribute('download', image.name);

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
    <div className="flex items-center justify-center">
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
        className={classNames('rounded-full p-1', {
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
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        errorMsg={errorMsg}
      />
    </div>
  );
}
