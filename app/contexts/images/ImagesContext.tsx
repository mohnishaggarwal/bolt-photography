import { createContext, useContext, Dispatch } from 'react';

type ImageState = {
  images: File[];
};

type Action = { type: 'ADD_IMAGES'; payload: File[] };

export const initialState: ImageState = {
  images: [],
};

export const reducer = (state: ImageState, action: Action): ImageState => {
  switch (action.type) {
    case 'ADD_IMAGES':
      const mergedImages = [...state.images, ...action.payload];
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
