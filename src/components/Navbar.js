import {Transition} from '@headlessui/react';
import {useEffect, useRef, useState} from 'react';

export const Navbar = ({children}) => {
  return (
    <nav className="relative h-16 px-2">
      <ul className="flex justify-end h-full max-w-full">{children}</ul>
    </nav>
  );
};

export const NavbarItem = ({children, icon}) => {
  const [open, setOpen] = useState(true);

  return (
    <li className="flex items-center justify-center">
      <button
        onClick={() => setOpen(!open)}
        className="transition-colors w-12 h-12 rounded-full bg-coolGray-300 m-0.5 p-1 flex items-center justify-center hover:bg-coolGray-400"
      >
        <span className="material-icons">{icon}</span>
      </button>
      <Transition
        show={open}
        enter="transition-all duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-all duration-300 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {children}
      </Transition>
    </li>
  );
};

export const DropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState('main');

  const DropdownItem = ({children, leftIcon, rightIcon, goToMenu}) => {
    return (
      <button
        onClick={() => goToMenu && setActiveMenu(goToMenu)}
        className="flex items-center w-full h-12 gap-2 p-2 font-medium transition-all hover:bg-coolGray-200 rounded-xl"
      >
        <span className="material-icons">{leftIcon}</span>
        {children}
        <span className="ml-auto material-icons">{rightIcon}</span>
      </button>
    );
  };

  return (
    <div
      className={`${activeMenu === 'main' && 'h-16'} ${
        activeMenu === 'settings' && 'h-40'
      } absolute overflow-hidden transition-all duration-300 ease-in-out bg-white shadow right-4 top-16 w-80 rounded-xl`}
    >
      <Transition
        show={activeMenu === 'main'}
        enter="transform transition-all duration-300 ease-out"
        enterFrom="absolute -translate-x-full"
        enterTo="absolute translate-x-0"
        leave="transform transition-all duration-300 ease-in"
        leaveFrom="absolute translate-x-0"
        leaveTo="absolute -translate-x-full"
        className="w-full p-2"
      >
        <DropdownItem goToMenu={'settings'} leftIcon={'settings'} rightIcon={'chevron_right'}>
          Settings
        </DropdownItem>
      </Transition>

      <Transition
        show={activeMenu === 'settings'}
        enter="transform transition-all duration-300 ease-out"
        enterFrom="absolute translate-x-full"
        enterTo="absolute translate-x-0"
        leave="transform transition-all duration-300 ease-in"
        leaveFrom="absolute translate-x-0"
        leaveTo="absolute translate-x-full"
        className="w-full p-2"
      >
        <DropdownItem goToMenu={'main'} leftIcon={'chevron_left'}>
          Go Back
        </DropdownItem>
        <DropdownItem leftIcon={'account_circle'}>Go Back</DropdownItem>
        <DropdownItem leftIcon={'account_circle'}>Go Back</DropdownItem>
      </Transition>
    </div>
  );
};
