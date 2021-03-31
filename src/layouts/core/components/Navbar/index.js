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
          {navPages.map((item, i) => (
            <NavLink key={i} icon={item.icon} path={item.path} />
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
        <span className="flex items-center justify-center w-12 h-12 p-1 transition cursor-pointer select-none hover:shadow-md rounded-xl bg-coolGray-200 hover:bg-coolGray-300 material-icons">
          {icon}
        </span>
      </ActiveLink>
    </li>
  );
};

NavLink.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  path: PropTypes.string,
};

export default NavBar;
