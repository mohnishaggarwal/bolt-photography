'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useImagesContext } from '@/app/contexts/images/ImagesContext';
import { postImages } from '@/app/actions/image-actions';
import IImage from '@/app/interfaces/image';
import { useAuthContext } from '../contexts/auth/AuthContext';
import APICallResult from '../interfaces/api-call-result';

export default function UploadButton({
  setIsUploadSuccessModalOpen,
  setErrorModalOpen,
  setErrorMsg,
}: {
  setIsUploadSuccessModalOpen: Dispatch<SetStateAction<boolean>>;
  setErrorModalOpen: Dispatch<SetStateAction<boolean>>;
  setErrorMsg: Dispatch<SetStateAction<string>>;
}) {
  const { state, dispatch } = useImagesContext();
  const { user } = useAuthContext();

  const getOnlyImageNames = (images: IImage[]): string[] => {
    return images.map((image: IImage) => image.name);
  };

  const doImagesExist = (imageNames: string[]) => {
    const allImages: string[] = [
      ...getOnlyImageNames(state.images),
      ...getOnlyImageNames(state.favoritedImages),
      ...getOnlyImageNames(state.hiddenImages),
      ...getOnlyImageNames(state.trashedImages),
    ];
    console.log(allImages, imageNames);
    for (const imageName of imageNames) {
      if (allImages.includes(imageName)) {
        return true;
      }
    }
    return false;
  };

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

    if (doImagesExist(jpgsAndPngs.map((image: File) => image.name))) {
      setErrorMsg('You cannot upload two images with the same name!');
      setErrorModalOpen(true);
      return;
    }

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
      setIsUploadSuccessModalOpen(true);
    } else {
      setErrorMsg(apiResponse.errorMsg);
      setErrorModalOpen(true);
    }
  };

  return (
    <>
      <label className="w-3/5 min-w-[150px] bg-accent-300 hover:bg-accent-200 rounded-full shadow-lg py-2 px-4 text-center text-white cursor-pointer">
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
    </>
  );
}
