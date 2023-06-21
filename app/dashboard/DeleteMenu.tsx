'use client';

import { useEffect, useState } from 'react';
import { useImagesContext } from '../contexts/images/ImagesContext';
import DeleteImagesModal from '@/app/global_components/modals/DeleteImagesModal';
import IImage from '../interfaces/image';
import classNames from 'classnames';

export default function DeleteMenu() {
  const { state, dispatch } = useImagesContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [numImgsDelete, setNumImgsDelete] = useState(0);
  const [deleteAllSelectable, setDeleteAllSelectable] = useState(false);
  const [recoverSelectable, setRecoverSelectable] = useState(false);
  const [deleteSelectable, setDeleteSelectable] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);

  const handleClickDelete = () => {
    setNumImgsDelete(state.selectedImages.length);
    setDeleteAll(false);
    setModalOpen(true);
  };

  const handleClickDeleteAll = () => {
    const imgsToDelete = state.images.filter(
      (image: IImage) => image.trash
    ).length;
    setNumImgsDelete(imgsToDelete);
    setDeleteAll(true);
    setModalOpen(true);
  };

  useEffect(() => {
    const numTrash = state.images.filter((image: IImage) => image.trash).length;
    setDeleteAllSelectable(numTrash > 0);
  }, [state.images]);

  useEffect(() => {
    setDeleteSelectable(state.selectedImages.length > 0);
    setRecoverSelectable(state.selectedImages.length > 0);
  }, [state.selectedImages]);

  return (
    <div className="flex justify-between w-64 text-accent-400 z-40">
      <button
        className={classNames(
          'hover:bg-accent-100 p-2 hover:text-white rounded-md',
          {
            'pointer-events-none': !recoverSelectable,
          }
        )}
        onClick={() => dispatch({ type: 'RECOVER_IMAGES' })}
      >
        <p>Recover</p>
      </button>
      <button
        className={classNames(
          'hover:bg-accent-100 p-2 hover:text-white rounded-md',
          {
            'pointer-events-none': !deleteSelectable,
          }
        )}
        onClick={handleClickDelete}
      >
        <p>Delete</p>
      </button>
      <button
        className={classNames(
          'hover:bg-accent-100 p-2 hover:text-white rounded-md',
          {
            'pointer-events-none': !deleteAllSelectable,
          }
        )}
        onClick={handleClickDeleteAll}
      >
        <p>Delete All</p>
      </button>
      <DeleteImagesModal
        deleteAll={deleteAll}
        numImagesDelete={numImgsDelete.toString()}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
