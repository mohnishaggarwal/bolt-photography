import { createContext, useContext, Dispatch } from 'react';
import IImage from '@/app/interfaces/image';

export type ImageState = {
  images: IImage[];
  favoritedImages: IImage[];
  trashedImages: IImage[];
  selectedImages: IImage[];
  hiddenImages: IImage[];
};

interface IUploadedImage {
  name: string;
  url: string;
}

type Action =
  | { type: 'ADD_IMAGES'; payload: Array<IUploadedImage> }
  | { type: 'TRASH_IMAGES' }
  | { type: 'SET_SELECTED'; payload: IImage }
  | { type: 'ADD_TO_SELECTED'; payload: IImage }
  | { type: 'REMOVE_FROM_SELECTED'; payload: IImage }
  | { type: 'RESET_SELECTED' }
  | { type: 'FAVORITE_IMAGES' }
  | { type: 'RECOVER_IMAGES' }
  | { type: 'REMOVE_FROM_FAVORITES' }
  | { type: 'DELETE_IMAGES' }
  | { type: 'DELETE_ALL_TRASH' };

const initialState: ImageState = {
  images: [],
  favoritedImages: [],
  trashedImages: [],
  selectedImages: [],
  hiddenImages: [],
};

export const reducer = (state: ImageState, action: Action): ImageState => {
  switch (action.type) {
    case 'ADD_IMAGES':
      const newImages = action.payload.map(({ name, url }: IUploadedImage) => ({
        src: url,
        name: name,
        uploadTime: Math.floor(Date.now() / 1000),
        tags: [] as string[],
      }));
      const mergedImages = [...state.images, ...newImages];
      return { ...state, images: mergedImages };
    case 'RECOVER_IMAGES':
      for (const selectedImg of state.selectedImages) {
        const selectedImgIndex = state.trashedImages.indexOf(selectedImg);
        if (selectedImgIndex == -1) {
          throw new Error("Selected image doesn't exist");
        }
        const removedImage = state.trashedImages.splice(selectedImgIndex);
        state.images = [...state.images, ...removedImage];
      }
      return { ...state };
    case 'TRASH_IMAGES':
      for (const selectedImg of state.selectedImages) {
        const selectedImgIndex = state.images.indexOf(selectedImg);
        if (selectedImgIndex == -1) {
          throw new Error("Selected image doesn't exist");
        }
        const removedImage = state.images.splice(selectedImgIndex);
        state.trashedImages = [...state.trashedImages, ...removedImage];
      }
      return { ...state };
    case 'FAVORITE_IMAGES':
      for (const selectedImg of state.selectedImages) {
        const selectedImgIndex = state.images.indexOf(selectedImg);
        if (selectedImgIndex == -1) {
          throw new Error("Selected image doesn't exist");
        }
        const removedImage = state.images.splice(selectedImgIndex);
        state.favoritedImages = [...state.favoritedImages, ...removedImage];
      }
      return { ...state };
    case 'REMOVE_FROM_FAVORITES':
      for (const selectedImg of state.selectedImages) {
        const selectedImgIndex = state.favoritedImages.indexOf(selectedImg);
        if (selectedImgIndex == -1) {
          throw new Error("Selected image doesn't exist");
        }
        const removedImage = state.favoritedImages.splice(selectedImgIndex);
        state.images = [...state.images, ...removedImage];
      }
      return { ...state };
    case 'SET_SELECTED':
      return { ...state, selectedImages: [action.payload] };
    case 'ADD_TO_SELECTED':
      return {
        ...state,
        selectedImages: [...state.selectedImages, action.payload],
      };
    case 'REMOVE_FROM_SELECTED':
      return {
        ...state,
        selectedImages: state.selectedImages.filter(
          (image: IImage) => image !== action.payload
        ),
      };
    case 'DELETE_IMAGES':
      for (const selectedImg of state.selectedImages) {
        const selectedImgIndex = state.trashedImages.indexOf(selectedImg);
        if (selectedImgIndex == -1) {
          throw new Error("Selected image doesn't exist");
        }
        state.trashedImages.splice(selectedImgIndex, 1);
      }
      return { ...state };
    case 'DELETE_ALL_TRASH':
      return { ...state, trashedImages: [], selectedImages: [] };
    case 'RESET_SELECTED':
      return { ...state, selectedImages: [] };
    default:
      return state;
  }
};

export const ImagesContext = createContext<{
  state: ImageState;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const useImagesContext = () => useContext(ImagesContext);
