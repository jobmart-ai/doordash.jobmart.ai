import classNames from 'classnames';
import towlschiiLogo from '../../assets/towlschii-logo.png'
import defaultProfilePicture from '../../assets/default-profile-picture.jpg'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const MenuList = [
  { name: 'Repository', href: '/repository' },
  { name: 'Utilities', href: '#' },
  { name: 'Calendar', href: '#' },
]


function ShowAuthenticated() {

  const {isAuth, SignOut, Authenticate} = AuthContext();
  const [base64Image, setBase64Image] = useState(``);
  console.log('Rendering Header with auth:', isAuth);

  const ProfileMenuList = [
    { name: 'Your Profile', onClick: SignOut },
    { name: 'Settings', onClick: SignOut },
    { name: 'Sign Out', onClick: SignOut }
  ]

  useEffect(() => {
    
    Authenticate();
    console.log('Authenticated from Header:', isAuth);

    const image = localStorage.getItem('profileImage');
    if (image) {
      setBase64Image(`data:image/jpeg;base64,${image}`);
    } else {
      setBase64Image(defaultProfilePicture);
    }

  }, [isAuth]);

  return isAuth
  ? (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <button
        type="button"
        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Profile dropdown */}
      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src={base64Image}
              alt="Base64"
            />
          </MenuButton>
        </div>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {ProfileMenuList.map((item, index) => (
              <MenuItem key={item.name}>
                {({ focus }) => (
                  <p
                    onClick={() => item.onClick()}
                    className={classNames(focus ? 'bg-rose-500 text-white' : '', 'cursor-pointer block px-4 py-2 text-sm text-gray-700')}
                  >
                    {item.name}
                  </p>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
  : (
    <a
    href='/login'
    className="rounded-md transition bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      Log In
    </a>
  );

}

export default function Header() {

  const [selectedMenu, setselectedMenu] = useState(-1);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <a href='/' className="hidden sm:flex flex-shrink-0 items-center">
                  <img
                    className="h-10 w-auto rounded-full hover:rotate-90 hover: transition"
                    src={towlschiiLogo}
                    alt="Your Company"
                  />
                </a>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {MenuList.map((item, index) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={
                          () => setselectedMenu(index)
                        }
                        className={classNames(
                          selectedMenu === index ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={selectedMenu === index ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            
              {/* Profile dropdown */}
              <ShowAuthenticated/>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {MenuList.map((item, index) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  onClick={
                    () => setselectedMenu(index)
                  }
                  className={classNames(
                    selectedMenu === index ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium transition'
                  )}
                  aria-current={selectedMenu === index ? 'page' : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};