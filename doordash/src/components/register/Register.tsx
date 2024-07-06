import { ChangeEvent, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import Home from '../home/Home';
import Header from '../header/Header';
import { PhotoIcon } from '@heroicons/react/24/solid';

function CreatAccount(username: string, password: string, email: string, image: any, setError: (arg0: string) => void, Authenticate: () => void) {

  const backendUrl = new URL(process.env.REACT_APP_TOWLSCHII_UTILITIES_INGRESS + "user");

  fetch(backendUrl, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
      profileImage: image
    })
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

function CaptureProfileImage(e: ChangeEvent<HTMLInputElement>, setImage: any, setError: any) {

  const reader = new FileReader();
  if(e.target.files) {
    const file = e.target.files[0];
    console.log('Selected file:', file);

    if(file.size > 1048576) {
      setError('Maximum image size is 1MB');
        return;
    }

    reader.onloadend = () => {
      if(!reader.result || !reader.result.toString().includes('image')) {
        setError('Error uploading image');
        return;
      }

      let base64String = reader.result.toString();
      if(base64String.split(',').length <= 1) {
        setError('Error uploading image');
        return;
      }

      base64String = base64String.split(',')[1];
      setImage({
        name: file.name,
        content: base64String
      });
      console.log(base64String);
    };

    reader.readAsDataURL(file);
  }

  setError(null);
}

export default function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const {isAuth, Authenticate} = AuthContext();
  const [error, setError] = useState("");

  console.log('Rendering Login with auth:', isAuth);

  useEffect(() => {
    Authenticate();
  }, [isAuth]);


  function SubmitButton({children}: any) {
  
    if(username && password && email)
      return (<a
        onClick={() => CreatAccount(username, password, email, image, setError, Authenticate)}
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
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">Create Account</h2>
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
                Email ID
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="towlschii@email.com"
                    onChange={(e) => setEmail(e.target.value)}
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

          <div className="col-span-full">
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
              Profile photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => CaptureProfileImage(e, setImage, setError)} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 1MB</p>
              </div>
            </div>
          </div>
          {
            image ?
              <p className='font-semibold text-sm text-gray-600'>
                Image: <span className='text-blue-500 font-normal'>{image['name']}</span>
              </p>
              : null
          }

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
          href="/login" className="text-sm transition font-semibold leading-6 text-rose-500 hover:translate-x-2"
        >
          Use existing Account <span aria-hidden="true">→</span>
        </a>
      </div>
    </form>
    </div>
    
  )
}
