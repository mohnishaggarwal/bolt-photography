'use client';

import { useEffect, useState } from 'react';
import { useImagesContext } from '../contexts/images/ImagesContext';
import DeleteImagesModal from '@/app/global_components/modals/DeleteImagesModal';
import classNames from 'classnames';
import APICallResult from '../interfaces/api-call-result';
import { updateImages } from '../actions/image-actions';
import { useAuthContext } from '../contexts/auth/AuthContext';
import IImage from '../interfaces/image';
import ErrorModal from '../global_components/modals/ErrorModal';

export default function DeleteMenu() {
  const { user } = useAuthContext();
  const { state, dispatch } = useImagesContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [numImgsDelete, setNumImgsDelete] = useState(0);
  const [deleteAllSelectable, setDeleteAllSelectable] = useState(false);
  const [recoverSelectable, setRecoverSelectable] = useState(false);
  const [deleteSelectable, setDeleteSelectable] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleClickDelete = () => {
    setNumImgsDelete(state.selectedImages.length);
    setDeleteAll(false);
    setModalOpen(true);
  };

  const handleClickDeleteAll = () => {
    setNumImgsDelete(state.trashedImages.length);
    setDeleteAll(true);
    setModalOpen(true);
  };

  const handleRecover = async () => {
    const apiCallResult: APICallResult = await updateImages(
      user.email,
      state.selectedImages.map((img: IImage) => img.name),
      'NORMAL'
    );
    if (apiCallResult.wasCallSuccessful) {
      dispatch({ type: 'RECOVER_IMAGES' });
    } else {
      setErrorMsg(apiCallResult.errorMsg);
      setIsErrorModalOpen(true);
    }
  };

  useEffect(() => {
    const numTrash = state.trashedImages.length;
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
        onClick={handleRecover}
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
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        errorMsg={errorMsg}
      />
    </div>
  );
}
