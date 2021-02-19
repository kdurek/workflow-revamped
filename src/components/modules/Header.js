import {useState} from 'react';
import {Transition} from '@headlessui/react';
import {useAuth} from '@/context/AuthContext';
import ActiveLink from '@/elements/ActiveLink';

const navItems = [
  {
    label: 'Dashboard',
    path: '/',
  },
  {
    label: 'Templates',
    path: '/templates',
  },
  {
    label: 'Printers',
    path: '/printers',
  },
];

const Header = () => {
  const {user, signOut} = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const NavItem = ({path, children}) => {
    return (
      <ActiveLink href={path}>
        <p className="text-xl font-medium transition-all transform cursor-pointer hover:scale-105 md:text-2xl lg:text-3xl text-coolGray-600">
          {children}
        </p>
      </ActiveLink>
    );
  };

  const NavItemMobile = ({path, children}) => {
    return (
      <ActiveLink href={path}>
        <button
          onClick={() => setMenuOpen(false)}
          className="w-full py-3 text-center transition-all transform text-coolGray-600 hover:bg-coolGray-50"
        >
          {children}
        </button>
      </ActiveLink>
    );
  };

  return (
    <header className="flex justify-between mb-4">
      {/* MENU DESKTOP */}
      <nav className="relative flex justify-end w-full md:justify-between">
        <div className="items-baseline hidden gap-2 md:flex md:gap-4">
          {navItems.map((item, i) => (
            <NavItem key={i} path={item.path}>
              {item.label}
            </NavItem>
          ))}
        </div>
        <div className="flex items-center">
          <p className="px-2 font-medium text-coolGray-600">{user.name}</p>
          <button onClick={() => setProfileOpen(true)} className="hidden md:block">
            <span className="p-2 align-middle rounded-xl text-coolGray-600 material-icons hover:bg-coolGray-50">
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
            <div className="absolute top-0 right-0 z-50">
              <div className="flex flex-col bg-white shadow rounded-xl">
                <div className="flex items-center justify-end">
                  <p className="px-2 font-medium text-coolGray-600">{user.name}</p>
                  <button onClick={() => setProfileOpen(false)}>
                    <span className="p-1 m-1 align-middle rounded-xl text-coolGray-600 material-icons hover:bg-coolGray-50">
                      close
                    </span>
                  </button>
                </div>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="px-5 py-3 text-red-600 border-t border-coolGray-100 rounded-b-xl hover:bg-coolGray-50"
                >
                  <span className="pr-2 align-middle material-icons">exit_to_app</span>
                  Logout
                </button>
              </div>
            </div>
          </Transition>
          <button onClick={() => setMenuOpen(true)} className="block md:hidden">
            <span className="p-2 align-middle rounded-xl text-coolGray-600 material-icons hover:bg-coolGray-50">
              menu
            </span>
          </button>
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
            <nav className="absolute inset-x-0 top-0 z-50 -m-2 md:hidden">
              <div className="flex flex-col bg-white shadow rounded-xl">
                <div className="flex items-center justify-end">
                  <p className="pl-2 font-medium text-coolGray-600">{user.name}</p>
                  <button onClick={() => setMenuOpen(false)} className="self-end">
                    <span className="p-2 m-2 align-middle rounded-xl text-coolGray-600 material-icons hover:bg-coolGray-50">
                      close
                    </span>
                  </button>
                </div>
                <div className="space-y-1">
                  {navItems.map((item, i) => (
                    <NavItemMobile key={i} path={item.path}>
                      {item.label}
                    </NavItemMobile>
                  ))}
                </div>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="px-5 py-3 text-red-600 border-t border-coolGray-100 rounded-b-xl hover:bg-coolGray-50"
                >
                  <span className="pr-2 align-middle material-icons">exit_to_app</span>
                  Logout
                </button>
              </div>
            </nav>
          </Transition>
        </div>
      </nav>
    </header>
  );
};

export default Header;
