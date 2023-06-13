"use client";

import {ReactNode} from "react";
import {AuthContext} from "./AuthContext";
import IUser from "../interfaces/user";

interface IProps {
  user: IUser
  children: ReactNode;
}

export default function AuthContextProvider({children, user}: IProps) {
  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  )
};