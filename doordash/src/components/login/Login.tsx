import { useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import Home from '../home/Home';
import Header from '../header/Header';

function SignIn(username: string, password: string, setError: (arg0: string) => void, Authenticate: () => void) {

  const backendUrl = new URL(process.env.REACT_APP_TOWLSCHII_UTILITIES_INGRESS + "user/login");
  backendUrl.search = new URLSearchParams({
    username: username,
    password: password
  }).toString();

  fetch(backendUrl, {
    method: 'POST',
    credentials: 'include'
  }).then((response) => {
    if(response.ok)
      response.json()
      .then((data) => {
        console.log(data);
        if(data['profileImage'] != null)
          localStorage.setItem('profileImage', data['profileImage']['content'])
        Authenticate();
      })
    else
      response.text()
      .then((data) => {
        console.log(data);
        setError(data)
        
      })
  })
  .catch((err) => {
    console.log(err.message);
    setError(err.message)
  });

}

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {isAuth, Authenticate} = AuthContext();
  const [error, setError] = useState("");

  console.log('Rendering Login with auth:', isAuth);

  useEffect(() => {
    Authenticate();
  }, [isAuth]);


  function SubmitButton({children}: any) {
  
    if(username && password)
      return (<a
        onClick={() => SignIn(username, password, setError, Authenticate)}
        className="cursor-pointer rounded-md transition bg-rose-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {children}
      </a>);
    else
      return (<a
        className="opacity-50 rounded-md transition bg-rose-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {children}
      </a>);
  }

  
  return isAuth ? 
  <>
    <Header />
    <Home />
  </>
  : (
    <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
      <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">Log In</h2>
          <p className="mt-1 mb-10 text-sm leading-6 text-gray-600">
            This information will be displayed privately only to the user.
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
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <p
          className='text-red-500'
          >
          {error}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-x-6">
        <SubmitButton>
          Submit
        </SubmitButton>
        <a
          href='/'
          className="cursor-pointer rounded-md transition px-3.5 py-2.5 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-300 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Cancel
        </a>
        <a 
          href="/register" className="text-sm transition font-semibold leading-6 text-rose-500 hover:translate-x-2"
        >
          Create an Account <span aria-hidden="true">→</span>
        </a>
      </div>
    </form>
    </div>
    
  )
}
