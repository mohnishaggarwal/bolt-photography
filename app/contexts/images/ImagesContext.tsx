import { createContext, useContext, Dispatch } from 'react';
import IImage from '@/app/interfaces/image';

type ImageState = {
  images: IImage[];
};

type Action = { type: 'ADD_IMAGES'; payload: File[] };

export const initialState: ImageState = {
  images: [],
};

export const reducer = (state: ImageState, action: Action): ImageState => {
  switch (action.type) {
    case 'ADD_IMAGES':
      const newImages = action.payload.map((file) => ({
        file,
        favorite: false,
        recentlyAdded: true,
        trash: false,
        hidden: false,
      }));
      const mergedImages = [...state.images, ...newImages];
      return { ...state, images: mergedImages };
    default:
      return state;
  }
};

export const ImagesContext = createContext<{
  state: ImageState;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const useImagesContext = () => useContext(ImagesContext);
