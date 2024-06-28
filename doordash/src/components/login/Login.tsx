import { useContext, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

function SignIn(username: string, password: string, setIsAuth: (arg0: boolean) => void, navigate: NavigateFunction) {

  const backendUrl = new URL(process.env.REACT_APP_TOWLSCHII_UTILITIES_INGRESS + "user/login");
  backendUrl.search = new URLSearchParams({
    username: username,
    password: password
  }).toString();

  fetch(backendUrl, {
    method: 'POST',
    credentials: 'include'
  }).then((response) => response.json())
  .then((data) => {
    console.log(data);
    setIsAuth(true);
  }).catch((err) => {
    console.log(err);
    setIsAuth(false);
  });

}

export default function Login() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {isAuth, setIsAuth} = useContext(AuthContext);

  useEffect(() => {
    if(isAuth)
      navigate('/');
  });
  
  return (
    <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
      <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <p className="mt-1 mb-10 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="my-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="towlschii"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="my-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="password"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="button"
          onClick={() => SignIn(username, password, setIsAuth, navigate)}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign In
        </button>
      </div>
    </form>
    </div>
    
  )
}
