import {useState} from 'react';

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
      {open && children}
    </li>
  );
};

export const DropdownMenu = ({children}) => {
  return (
    <div className="absolute p-4 overflow-hidden transform bg-white shadow-xl right-4 top-20 w-80 rounded-xl">
      {children}
    </div>
  );
};

export const DropdownItem = ({children, leftIcon, rightIcon}) => {
  return (
    <button className="flex items-center w-full h-12 gap-2 p-2 font-medium transition-colors hover:bg-coolGray-200 rounded-xl">
      <span className="material-icons">{leftIcon}</span>
      {children}
      <span className="ml-auto material-icons">{rightIcon}</span>
    </button>
  );
};
