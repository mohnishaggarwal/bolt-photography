import {createContext, useContext} from 'react';
import IUser from "../interfaces/user";

interface IAuthContext {
  user: IUser
};

export const AuthContext = createContext<IAuthContext>({
  user: {
    name: '',
    email: '',
    image: ''
  }
});

export const useAuthContext = () => useContext(AuthContext);