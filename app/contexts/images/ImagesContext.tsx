import { createContext, useContext, Dispatch } from 'react';
import IImage from '@/app/interfaces/image';

export type ImageState = {
  images: IImage[];
  favoritedImages: [];
  trashedImages: [];
  selectedImages: IImage[];
};

type Action =
  | { type: 'ADD_IMAGES'; payload: File[] }
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
        uploadTime: Math.floor(Date.now() / 1000),
        tags: [],
      }));
      const mergedImages = [...state.images, ...newImages];
      return { ...state, images: mergedImages };
    case 'RECOVER_IMAGES':
      let recoveredImageState = state.images;
      state.selectedImages.forEach((selectedImage) => {
        const index = state.images.findIndex(
          (image) => image.file === selectedImage.file
        );
        if (index !== -1) {
          recoveredImageState[index].trash = false;
        }
      });
      return { ...state, images: recoveredImageState, selectedImages: [] };
    case 'TRASH_IMAGES':
      if (state.selectedImages.length === 0) {
        return state;
      }
      const trashImageState = state.images.map((image: IImage) => {
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
      return { ...state, selectedImages: [], images: trashImageState };
    case 'FAVORITE_IMAGES':
      if (state.selectedImages.length === 0) {
        return state;
      }
      const favoritedImages = state.images.map((image: IImage) => {
        const isFavorite = state.selectedImages.find(
          (favoriteImage: IImage) => {
            return image.file === favoriteImage.file;
          }
        );
        if (isFavorite) {
          return {
            ...image,
            favorite: true,
          };
        } else {
          return image;
        }
      });
      return { ...state, selectedImages: [], images: favoritedImages };
    case 'REMOVE_FROM_FAVORITES':
      let unFavoritedImageState = state.images;
      state.selectedImages.forEach((selectedImage) => {
        const index = state.images.findIndex(
          (image) => image.file === selectedImage.file
        );
        if (index !== -1) {
          unFavoritedImageState[index].favorite = false;
        }
      });
      return { ...state, images: unFavoritedImageState, selectedImages: [] };
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
    case 'DELETE_IMAGES':
      const nonDeletedImages = state.images.filter((image: IImage) => {
        const isDeleted = state.selectedImages.findIndex(
          (deletedImage: IImage) => deletedImage.file === image.file
        );
        return isDeleted === -1;
      });
      return { ...state, images: nonDeletedImages, selectedImages: [] };
    case 'DELETE_ALL_TRASH':
      const safeImages = state.images.filter((image: IImage) => !image.trash);
      return { ...state, images: safeImages, selectedImages: [] };
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
