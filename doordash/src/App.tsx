import './index.css';
import PrivateRoutes from './components/privateRoutes';
import { BrowserRouter } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AuthContext } from './context/authContext';

function Authenticate(isAuth: boolean, setIsAuth: Dispatch<SetStateAction<boolean>>) {
  
  const backendUrl = new URL(process.env.REACT_APP_TOWLSCHII_UTILITIES_INGRESS + "user");

  if (localStorage.getItem('profileImage') == null)
    backendUrl.search = new URLSearchParams({
      profileImage: '1'
    }).toString();

  useEffect(() => {
      fetch(backendUrl, {
        method: 'GET',
        credentials: 'include'
      }).then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data['profileImage'] != null)
          localStorage.setItem('profileImage', data['profileImage']['content'])
        setIsAuth(true);
      }).catch((err) => {
        console.log(err);
        localStorage.clear()
        setIsAuth(false);
      });
  }, [isAuth]);
}


export default function App() {

  const [isAuth, setIsAuth] = useState(false);
  Authenticate(isAuth, setIsAuth);

  return (
    <div>
      <BrowserRouter>
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
          <PrivateRoutes />
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}
