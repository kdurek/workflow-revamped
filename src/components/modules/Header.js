import Link from 'next/link';
import {firebaseClient} from '../../../firebaseClient';

const NavItem = ({href, children}) => {
  return (
    <Link href={href}>
      <button className="text-3xl font-medium text-gray-900 outline-none">{children}</button>
    </Link>
  );
};

const Header = () => {
  return (
    <header className="flex justify-between mb-4">
      <nav className="flex items-end gap-4">
        <NavItem href="/">Dashboard</NavItem>
        <NavItem href="/templates">Templates</NavItem>
        <NavItem href="/toners">Toners</NavItem>
      </nav>
      <button
        onClick={async () => {
          await firebaseClient.auth().signOut();
          window.location.href = '/';
        }}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
