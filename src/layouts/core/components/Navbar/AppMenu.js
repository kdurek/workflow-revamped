import {Menu, Transition} from '@headlessui/react';
import {signOut, useSession} from 'next-auth/client';
import Link from 'next/link';

const AppMenu = () => {
  const [session] = useSession();

  return (
    <div className="relative inline-block text-left">
      <Menu>
        {({open}) => (
          <>
            <Menu.Button className="flex items-center justify-center px-2 group">
              <span className="py-3 mr-2">{session.user.name}</span>
              <span className="p-1 transition rounded-full material-icons group-hover:bg-coolGray-200">
                expand_more
              </span>
            </Menu.Button>

            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              className="relative z-40"
            >
              <Menu.Items
                static
                className="absolute right-0 mt-1 overflow-hidden bg-white divide-y rounded-md shadow-lg outline-none w-72 divide-coolGray-100 ring-1 ring-opacity-50 ring-coolGray-300"
              >
                <div className="px-4 py-3">
                  <p className="text-sm truncate">
                    Role is <span className="font-medium">{session.user.role}</span>
                  </p>
                  <p className="text-sm truncate">
                    Located in <span className="font-medium">{session.user.location}</span>
                  </p>
                </div>

                <div className="py-1">
                  <Menu.Item>
                    <Link href="/profile">
                      <button
                        disabled
                        className={`w-full px-4 py-2 text-sm text-left hover:bg-coolGray-100 cursor-not-allowed`}
                      >
                        Profile
                      </button>
                    </Link>
                  </Menu.Item>
                </div>

                <div className="py-1">
                  <Menu.Item>
                    <button
                      onClick={() => signOut()}
                      className={`w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-100`}
                    >
                      Sign out
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export default AppMenu;
