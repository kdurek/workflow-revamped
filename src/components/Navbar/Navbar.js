import {Transition} from '@headlessui/react';
import React, {useRef, useState} from 'react';
import {useSession, signOut} from 'next-auth/client';
import classNames from 'classnames';

import ActiveLink from '@/components/Navbar/ActiveLink';
import useClickOutside from '@/hooks/useClickOutside';

const navPages = [
  {
    label: 'Dashboard',
    path: '/',
    icon: 'dashboard',
  },
  {
    label: 'Templates',
    path: '/templates',
    icon: 'list_alt',
  },
  {
    label: 'Printers',
    path: '/printers',
    icon: 'print',
  },
];

export const NavBar = () => {
  return (
    <nav className="relative flex justify-between p-2 bg-white shadow rounded-xl">
      <ul className="flex gap-2">
        {navPages.map((item, i) => (
          <NavLink key={i} icon={item.icon} path={item.path} />
        ))}
      </ul>
      <ul className="flex gap-2">
        {/* {window.location.pathname === '/printers' && <NavButton icon={'settings'} />} */}
        <AppMenu />
      </ul>
    </nav>
  );
};

const NavButton = React.forwardRef(function NavButton({className, icon, onClick}, ref) {
  return (
    <li ref={ref} className="flex items-center justify-center">
      <button
        onClick={onClick}
        className={classNames(
          'transition-all w-12 h-12 rounded-full bg-coolGray-200 p-1 flex items-center shadow-inner justify-center hover:bg-coolGray-400',
          className
        )}
      >
        <span className="material-icons">{icon}</span>
      </button>
    </li>
  );
});

const NavLink = ({icon, path}) => {
  return (
    <ActiveLink href={path}>
      <NavButton icon={icon} />
    </ActiveLink>
  );
};

const AppMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <NavButton
        className={classNames({'bg-coolGray-400': open})}
        icon={'expand_more'}
        onClick={() => setOpen(!open)}
      />
      {open && <DropdownMenu setOpen={setOpen} />}
    </>
  );
};

const DropdownMenu = ({setOpen}) => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [session, loading] = useSession();

  const ref = useRef();
  useClickOutside(ref, () => setOpen(false));

  const DropdownItem = ({children, className, leftIcon, onClick, rightIcon}) => {
    return (
      <button
        onClick={onClick}
        className={classNames(
          'flex items-center w-full h-12 gap-2 p-2 font-medium transition-all hover:bg-coolGray-300 rounded-xl',
          className
        )}
      >
        <span className="material-icons">{leftIcon}</span>
        {children}
        <span className="ml-auto material-icons">{rightIcon}</span>
      </button>
    );
  };

  const getHeight = () => {
    switch (activeMenu) {
      case 'main':
        return 'h-40';

      case 'profile':
        return 'h-40';

      case 'settings':
        return 'h-28';

      default:
        return 'h-16';
    }
  };

  return (
    <div
      ref={ref}
      className={classNames(
        'z-40 absolute overflow-hidden transition-all p-2 bg-white duration-300 ease-in-out shadow right-4 top-16 w-80 rounded-xl',
        getHeight()
      )}
    >
      {/* Main Menu */}
      <Transition
        show={activeMenu === 'main'}
        enter="transform transition-all duration-300 ease-out"
        enterFrom="absolute -translate-x-3/2"
        enterTo="absolute translate-x-0"
        leave="transform transition-all duration-300 ease-in"
        leaveFrom="absolute translate-x-0"
        leaveTo="absolute -translate-x-3/2"
        className="w-full"
      >
        <DropdownItem
          onClick={() => setActiveMenu('profile')}
          leftIcon={'account_circle'}
          rightIcon={'chevron_right'}
        >
          {session?.user.name}
        </DropdownItem>
        <DropdownItem
          onClick={() => setActiveMenu('settings')}
          leftIcon={'settings'}
          rightIcon={'chevron_right'}
        >
          Settings
        </DropdownItem>
        <DropdownItem onClick={() => signOut()} leftIcon={'logout'} className="text-red-600">
          Logout
        </DropdownItem>
      </Transition>

      {/* Profile Menu */}
      <Transition
        show={activeMenu === 'profile'}
        enter="transform transition-all duration-300 ease-out"
        enterFrom="absolute translate-x-3/2"
        enterTo="absolute translate-x-0"
        leave="transform transition-all duration-300 ease-in"
        leaveFrom="absolute translate-x-0"
        leaveTo="absolute translate-x-3/2"
        className="w-full"
      >
        <DropdownItem onClick={() => setActiveMenu('main')} leftIcon={'chevron_left'}>
          Go Back
        </DropdownItem>
        <DropdownItem leftIcon={'block'}>Placeholder</DropdownItem>
        <DropdownItem leftIcon={'block'}>Placeholder</DropdownItem>
      </Transition>

      {/* Settings Menu */}
      <Transition
        show={activeMenu === 'settings'}
        enter="transform transition-all duration-300 ease-out"
        enterFrom="absolute translate-x-3/2"
        enterTo="absolute translate-x-0"
        leave="transform transition-all duration-300 ease-in"
        leaveFrom="absolute translate-x-0"
        leaveTo="absolute translate-x-3/2"
        className="w-full"
      >
        <DropdownItem onClick={() => setActiveMenu('main')} leftIcon={'chevron_left'}>
          Go Back
        </DropdownItem>
        <DropdownItem leftIcon={'block'}>Placeholder</DropdownItem>
      </Transition>
    </div>
  );
};
