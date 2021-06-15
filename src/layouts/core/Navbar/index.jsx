import {Disclosure, Menu, Transition} from '@headlessui/react';
import {Fragment} from 'react';
import {signOut, useSession} from 'next-auth/client';
import classNames from 'classnames';
import Link from 'next/link';

import {NAV_ITEMS, PROFILE_ITEMS} from '@/app/constants';
import NavLink from '@/layouts/core/Navbar/NavLink';

const getInitials = name => {
  const splitName = name.split(' ');
  const initials = splitName[0].charAt(0).toUpperCase() + splitName[1].charAt(0).toUpperCase();
  return initials;
};

const NavBar = () => {
  const [session] = useSession();

  return (
    <Disclosure as="nav" className="bg-white shadow rounded-xl">
      {({open}) => (
        <>
          <div className="px-4 mx-auto">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-10 h-10 text-4xl text-gray-600 select-none material-icons">
                    polymer
                  </span>
                </div>
                <div className="hidden md:block">
                  <div className="flex items-baseline ml-10 space-x-4">
                    {NAV_ITEMS.map(item => (
                      <NavLink key={item.path} href={item.path}>
                        <a className="px-3 py-2 font-medium rounded-xl">{item.label}</a>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center ml-4 md:ml-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    {({open}) => (
                      <>
                        <div>
                          <Menu.Button className="flex items-center max-w-xs bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900">
                            <span className="sr-only">Open user menu</span>
                            <span className="flex items-center justify-center w-10 h-10 font-medium rounded-full shadow-inner">
                              {getInitials(session.user.name)}
                            </span>
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white shadow-lg rounded-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {PROFILE_ITEMS.map(item => (
                              <Menu.Item key={item}>
                                {({active}) => (
                                  <Link href={item.path}>
                                    <a
                                      className={classNames('block px-4 py-2 hover:bg-gray-100', {
                                        'bg-gray-100': active,
                                      })}
                                    >
                                      {item.label}
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                            <Menu.Item>
                              {({active}) => (
                                <button
                                  type="button"
                                  onClick={signOut}
                                  className={classNames('w-full px-4 py-2 text-left text-red-600', {
                                    'bg-red-100': active,
                                  })}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
              <div className="flex -mr-2 md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-600 rounded-xl hover:bg-gray-300 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <span className="block w-6 h-6 material-icons">close</span>
                  ) : (
                    <span className="block w-6 h-6 material-icons">menu</span>
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAV_ITEMS.map(item => (
                <NavLink key={item.path} href={item.path}>
                  <a className="block px-3 py-2 font-medium rounded-xl">{item.label}</a>
                </NavLink>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-300">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-10 h-10 font-medium bg-gray-300 rounded-full shadow-inner cursor-default">
                    {getInitials(session.user.name)}
                  </span>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none">{session.user.name}</div>
                  <div className="text-sm font-medium leading-none">{session.user.email}</div>
                  <div className="text-sm leading-none">{`${session.user.role} in ${session.user.location.city}`}</div>
                </div>
              </div>
              <div className="px-2 mt-3 space-y-1">
                {PROFILE_ITEMS.map(item => (
                  <NavLink key={item.path} href={item.path}>
                    <a className="block px-3 py-2 font-medium rounded-xl">{item.label}</a>
                  </NavLink>
                ))}
                <button
                  type="button"
                  onClick={signOut}
                  className="w-full px-3 py-2 text-left text-red-600 hover:shadow-inner rounded-xl hover:bg-red-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
