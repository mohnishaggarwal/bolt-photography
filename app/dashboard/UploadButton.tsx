'use client';

import { ChangeEvent, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useImagesContext } from '@/app/contexts/images/ImagesContext';
import UploadErrorModal from '../global_components/modals/ErrorModal';
import UploadSuccessModal from '../global_components/modals/UploadSuccessModal';
import { postImages } from '@/app/actions/image-actions';
import { useAuthContext } from '../contexts/auth/AuthContext';
import APICallResult from '../interfaces/api-call-result';

export default function UploadButton() {
  const { dispatch } = useImagesContext();
  const { user } = useAuthContext();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    for (const file of Array.from(fileList!)) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        setErrorMsg(
          'Currently, Bolt only supports PNGs and JPEGs. Be patient with us as we slowly begin supporting more types!'
        );
        setErrorModalOpen(true);
        return;
      }
    }
    const jpgsAndPngs = Array.from(fileList!).filter((file) =>
      /\.(jpg|png)$/i.test(file.name)
    );

    const apiResponse: APICallResult = await postImages(
      user.email,
      jpgsAndPngs
    );
    if (apiResponse.wasCallSuccessful) {
      const imageNamesAndUrls = jpgsAndPngs.map((image: File) => ({
        url: URL.createObjectURL(image),
        name: image.name,
      }));

      dispatch({ type: 'ADD_IMAGES', payload: imageNamesAndUrls });
      setSuccessModalOpen(true);
    } else {
      setErrorMsg(apiResponse.errorMsg);
      setErrorModalOpen(true);
    }
  };

  return (
    <>
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
        {errorModalOpen && (
          <UploadErrorModal
            isOpen={errorModalOpen}
            onClose={() => setErrorModalOpen(false)}
            errorMsg={errorMsg}
          />
        )}
      </label>
      {successModalOpen && (
        <UploadSuccessModal
          isOpen={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
        />
      )}
    </>
  );
}
