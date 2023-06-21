import { createContext, useContext, Dispatch } from 'react';
import IImage from '@/app/interfaces/image';

type ImageState = {
  images: IImage[];
  selectedImages: IImage[];
};

type Action =
  | { type: 'ADD_IMAGES'; payload: File[] }
  | { type: 'TRASH_IMAGES' }
  | { type: 'SET_SELECTED'; payload: IImage }
  | { type: 'ADD_TO_SELECTED'; payload: IImage }
  | { type: 'REMOVE_FROM_SELECTED'; payload: IImage }
  | { type: 'RESET_SELECTED' }
  | { type: 'RECOVER_IMAGES' };

export const initialState: ImageState = {
  images: [],
  selectedImages: [],
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
        uploadTime: new Date(),
      }));
      const mergedImages = [...state.images, ...newImages];
      return { ...state, images: mergedImages };
    case 'RECOVER_IMAGES':
      let newImageState = state.images;
      state.selectedImages.forEach((selectedImage) => {
        const index = state.images.findIndex(
          (image) => image.file === selectedImage.file
        );
        if (index !== -1) {
          newImageState[index].trash = false;
        }
      });
      return { ...state, images: newImageState, selectedImages: [] };
    case 'TRASH_IMAGES':
      if (state.selectedImages.length === 0) {
        return state;
      }
      const updatedImageState = state.images.map((image: IImage) => {
        const isTrash = state.selectedImages.find((trashImage: IImage) => {
          return image.file === trashImage.file;
        });
        if (isTrash) {
          return {
            ...image,
            trash: true,
          };
        } else {
          return image;
        }
      });
      return { ...state, selectedImages: [], images: updatedImageState };
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
          (image: IImage) => image.file !== action.payload.file
        ),
      };
    default:
      return state;
  }
};

export const ImagesContext = createContext<{
  state: ImageState;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const useImagesContext = () => useContext(ImagesContext);
