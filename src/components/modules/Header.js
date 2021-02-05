import {useState} from 'react';
import ActiveLink from '@/elements/ActiveLink';
import {Transition} from '@headlessui/react';
import firebaseClient from 'firebaseClient';
import Input from '@/elements/Input';

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
    label: 'Toners',
    path: '/toners',
  },
];

const Header = ({user}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userNameEditOpen, setUserNameEditOpen] = useState(false);
  const [userName, setUserName] = useState(user.name);

  const updateProfile = newName => {
    firebaseClient
      .auth()
      .currentUser.updateProfile({
        displayName: newName,
      })
      .then(function () {
        // Update successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  const NavItem = ({path, children}) => {
    return (
      <ActiveLink href={path}>
        <p className="font-medium transition-all transform cursor-pointer hover:scale-105 md:text-1xl lg:text-2xl text-coolGray-600">
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
        <div className="items-baseline hidden gap-2 md:flex md:gap-4 lg:gap-6">
          {navItems.map((item, i) => (
            <NavItem key={i} path={item.path}>
              {item.label}
            </NavItem>
          ))}
        </div>
        <div className="flex items-center">
          <p className="px-2 font-medium text-coolGray-600">{user.email}</p>
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
                <div className="flex items-center">
                  <p className="px-2 font-medium text-coolGray-600">{user.email}</p>
                  <button onClick={() => setProfileOpen(false)} className="self-end">
                    <span className="p-1 m-1 align-middle rounded-xl text-coolGray-600 material-icons hover:bg-coolGray-50">
                      close
                    </span>
                  </button>
                </div>
                {!userNameEditOpen ? (
                  <button onClick={() => setUserNameEditOpen(true)}>{userName}</button>
                ) : (
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      updateProfile(userName);
                      setUserNameEditOpen(false);
                    }}
                    className="flex justify-center"
                  >
                    <Input
                      label="Name"
                      onChange={e => setUserName(e.target.value)}
                      className="w-5/6 mb-2"
                    />
                  </form>
                )}
                <button
                  onClick={async () => {
                    await firebaseClient.auth().signOut();
                    window.location.href = '/login';
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
                  <p className="pl-2 font-medium text-coolGray-600">{user.email}</p>
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
                  onClick={async () => {
                    await firebaseClient.auth().signOut();
                    window.location.href = '/login';
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
