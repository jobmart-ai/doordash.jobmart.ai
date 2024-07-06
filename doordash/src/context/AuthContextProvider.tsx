import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { OriginalAuthContext } from './AuthContext';

const AuthProvider = ({children}: any) => {

    const [isAuth, setIsAuth] = useState(false);

    function SignOut() {
  
        const backendUrl = new URL(process.env.REACT_APP_TOWLSCHII_UTILITIES_INGRESS + "user/logout");
    
        console.log('Logging Out...')
        fetch(backendUrl, {
          method: 'POST',
          credentials: 'include'
        }).then((response) => response.json())
        .then((data) => {
          console.log(data);
        }).catch((err) => {
          console.log(err);
        });
      
        setIsAuth(false);
    }
    
    function Authenticate() {
      
        if(isAuth)
            console.log('Already logged In...')
        else
            console.log('Logging In...')
        
        const backendUrl = new URL(process.env.REACT_APP_TOWLSCHII_UTILITIES_INGRESS + "user");
      
        if (localStorage.getItem('profileImage') == null)
          backendUrl.search = new URLSearchParams({
            profileImage: '1'
          }).toString();
        
        fetch(backendUrl, {
          method: 'GET',
          credentials: 'include'
        }).then((response) => {
          if(response.ok)
            response.json()
            .then((data) => {
              console.log(data);
              if(data['profileImage'] != null)
                localStorage.setItem('profileImage', data['profileImage']['content'])
              setIsAuth(true);
            })
          else
            response.text()
            .then((data) => {
              console.log(data);
              localStorage.clear();
              setIsAuth(false);
            })
        })
        .catch((err) => {
          console.log(err);
          localStorage.clear();
          setIsAuth(false);
        });
    }
    

    return (
        <OriginalAuthContext.Provider value={{ isAuth, setIsAuth, SignOut, Authenticate }}>
            {children}
        </OriginalAuthContext.Provider>
    );
};

export default AuthProvider;