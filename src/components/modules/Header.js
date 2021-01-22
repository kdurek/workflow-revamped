import Link from 'next/link';

const NavItem = ({children}) => {
  return (
    <Link href={`/${children.toLowerCase()}`}>
      <button className="text-3xl font-medium text-gray-900 outline-none">{children}</button>
    </Link>
  );
};

const Header = () => {
  return (
    <header className="mb-4">
      <nav className="flex items-end gap-4">
        <NavItem>Dashboard</NavItem>
        <NavItem>Templates</NavItem>
        <NavItem>Toners</NavItem>
      </nav>
    </header>
  );
};

export default Header;
