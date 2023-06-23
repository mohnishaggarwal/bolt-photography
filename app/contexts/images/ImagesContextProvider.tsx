'use client';

import React, { ReactNode, useReducer } from 'react';
import { ImagesContext, reducer, ImageState } from './ImagesContext';

interface IProps {
  children: ReactNode;
  initialState: ImageState;
}

export default function ImagesContextProvider({
  children,
  initialState,
}: IProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ImagesContext.Provider value={{ state, dispatch }}>
      {children}
    </ImagesContext.Provider>
  );
}
