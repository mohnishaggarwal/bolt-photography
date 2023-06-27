'use client';

import React, { ReactNode, useReducer } from 'react';
import { ImagesContext, reducer, ImageState } from './ImagesContext';
import IImage from '@/app/interfaces/image';

interface IFetchImage {
  name: string;
  url: string;
  tags: Array<{ Key: string; value: string }>;
}

interface IProps {
  children: ReactNode;
  fetchedImages: IFetchImage[];
}

const getInitialState = (fetchedImages: IFetchImage[]) => {
  let initialState: ImageState = {
    images: [],
    favoritedImages: [],
    trashedImages: [],
    selectedImages: [],
    hiddenImages: [],
  };

  for (const fetchedImage of fetchedImages) {
    let typeOf: string = '';
    let imgTags: string[] = [];
    let uploadTime: number = 0;
    for (const awsTag of fetchedImage.tags) {
      if (awsTag.Key === 'typeOfImg') {
        typeOf = awsTag.value;
      } else if (awsTag.Key === 'uploadTime') {
        uploadTime = parseInt(awsTag.value);
      } else {
        imgTags.push(awsTag.Key);
      }
    }

    const img: IImage = {
      name: fetchedImage.name,
      src: fetchedImage.url,
      uploadTime: uploadTime,
      tags: imgTags,
    };

    switch (typeOf) {
      case 'NORMAL':
        initialState.images.push(img);
        break;
      case 'TRASH':
        initialState.trashedImages.push(img);
        break;
      case 'HIDDEN':
        initialState.hiddenImages.push(img);
        break;
      case 'FAVORITE':
        initialState.favoritedImages.push(img);
        break;
      default:
        initialState.images.push(img);
        break;
    }
  }

  return initialState;
};

export default function ImagesContextProvider({
  children,
  fetchedImages,
}: IProps) {
  const initialState = getInitialState(fetchedImages);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ImagesContext.Provider value={{ state, dispatch }}>
      {children}
    </ImagesContext.Provider>
  );
}
