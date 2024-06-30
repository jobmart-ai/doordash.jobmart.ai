import { createContext, Dispatch, SetStateAction, useContext } from 'react';

interface AuthContextType {
    isAuth: boolean;
    setIsAuth: Dispatch<SetStateAction<boolean>>;
    SignOut: any;
    Authenticate: any;
}

export const OriginalAuthContext = createContext<AuthContextType>({
    isAuth: false,
    setIsAuth: () => {},
    SignOut: () => {},
    Authenticate: () => {}
})

const AuthContext = () => useContext(OriginalAuthContext);

export default AuthContext;