import PropTypes from 'prop-types';

import ActiveLink from '@/layouts/core/components/ActiveLink';
import AppMenu from '@/layouts/core/components/Navbar/AppMenu';
import Card from '@/common/components/Card';

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

const NavBar = () => {
  return (
    <Card>
      <nav className="flex justify-between">
        <ul className="flex gap-2">
          {navPages.map(item => (
            <NavLink key={item.path} icon={item.icon} path={item.path} />
          ))}
        </ul>
        <AppMenu />
      </nav>
    </Card>
  );
};

const NavLink = ({icon, path}) => {
  return (
    <li className="flex items-center justify-center">
      <ActiveLink href={path}>
        <span className="flex items-center justify-center w-12 h-12 p-1 transition bg-gray-200 shadow cursor-pointer select-none hover:shadow-md ring-1 ring-opacity-50 ring-gray-300 rounded-xl hover:bg-gray-300 material-icons">
          {icon}
        </span>
      </ActiveLink>
    </li>
  );
};

NavLink.propTypes = {
  icon: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default NavBar;
