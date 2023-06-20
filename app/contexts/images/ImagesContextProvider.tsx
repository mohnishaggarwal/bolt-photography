'use client';

import React, { ReactNode, useReducer } from 'react';
import { ImagesContext, reducer, initialState } from './ImagesContext';

interface IProps {
  children: ReactNode;
}

export default function ImagesContextProvider({ children }: IProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ImagesContext.Provider value={{ state, dispatch }}>
      {children}
    </ImagesContext.Provider>
  );
}
