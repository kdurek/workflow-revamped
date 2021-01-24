import {useState} from 'react';
import Link from 'next/link';
import {Transition} from '@headlessui/react';
import {firebaseClient} from '../../../firebaseClient';

const Header = ({user}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const NavItem = ({href, children}) => {
    return (
      <Link href={href}>
        <p className="font-medium transition-all transform cursor-pointer hover:scale-105 md:text-2xl lg:text-3xl text-coolGray-600">
          {children}
        </p>
      </Link>
    );
  };

  const NavItemMobile = ({href, children}) => {
    return (
      <Link href={href}>
        <button
          onClick={() => setMenuOpen(false)}
          className="w-full py-3 text-xl font-medium text-center transition-all transform text-coolGray-600 hover:bg-coolGray-200"
        >
          <p className="px-5">{children}</p>
        </button>
      </Link>
    );
  };

  return (
    <header>
      <div className="flex justify-between mb-4">
        <nav className="relative flex justify-end w-full md:justify-between">
          <div className="hidden gap-2 md:flex md:gap-4 lg:gap-8">
            <NavItem href="/">Dashboard</NavItem>
            <NavItem href="/templates">Templates</NavItem>
            <NavItem href="/toners">Toners</NavItem>
          </div>
          <div className="flex items-center">
            <p className="px-2 font-medium">{user.email}</p>
            <button onClick={() => setMenuOpen(true)} className="block md:hidden">
              <span className="p-2 align-middle rounded-xl text-coolGray-600 material-icons hover:bg-coolGray-200">
                menu
              </span>
            </button>
            <button onClick={() => setProfileOpen(true)} className="hidden md:block">
              <span className="p-2 align-middle rounded-xl text-coolGray-600 material-icons hover:bg-coolGray-200">
                account_circle
              </span>
            </button>
            <Transition
              show={profileOpen}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="absolute top-0 right-0">
                <div className="flex flex-col bg-white shadow rounded-xl">
                  <div className="flex items-center">
                    <p className="px-2 font-medium">{user.email}</p>
                    <button onClick={() => setProfileOpen(false)} className="self-end">
                      <span className="p-1 m-1 align-middle rounded-xl text-coolGray-600 material-icons hover:bg-coolGray-200">
                        close
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    {/* <NavItemMobile href="/">Dashboard</NavItemMobile>
                    <NavItemMobile href="/templates">Templates</NavItemMobile>
                    <NavItemMobile href="/toners">Toners</NavItemMobile> */}
                  </div>
                  <button
                    onClick={async () => {
                      await firebaseClient.auth().signOut();
                      window.location.href = '/login';
                    }}
                    className="px-5 py-3 text-red-600 rounded-b-lg bg-coolGray-100 hover:bg-coolGray-200"
                  >
                    <span className="pr-2 align-middle material-icons">exit_to_app</span>
                    Logout
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </nav>
      </div>
      {/* MENU MOBILE */}
      <Transition
        show={menuOpen}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <nav className="absolute inset-x-0 top-0 p-2 md:hidden">
          <div className="flex flex-col bg-white shadow rounded-xl">
            <div className="flex items-center justify-end">
              <p className="pl-2 font-medium">{user.email}</p>
              <button onClick={() => setMenuOpen(false)} className="self-end">
                <span className="p-2 m-2 align-middle rounded-xl text-coolGray-600 material-icons hover:bg-coolGray-200">
                  close
                </span>
              </button>
            </div>
            <div className="space-y-1">
              <NavItemMobile href="/">Dashboard</NavItemMobile>
              <NavItemMobile href="/templates">Templates</NavItemMobile>
              <NavItemMobile href="/toners">Toners</NavItemMobile>
            </div>
            <button
              onClick={async () => {
                await firebaseClient.auth().signOut();
                window.location.href = '/login';
              }}
              className="px-5 py-3 text-red-600 rounded-b-lg bg-coolGray-100 hover:bg-coolGray-200"
            >
              <span className="pr-2 align-middle material-icons">exit_to_app</span>
              Logout
            </button>
          </div>
        </nav>
      </Transition>
    </header>
  );
};

export default Header;
