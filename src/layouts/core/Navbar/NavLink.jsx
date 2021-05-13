import {useRouter} from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

const NavLink = ({children, href}) => {
  const router = useRouter();

  let className = children.props.className || '';

  if (router.pathname === href) {
    className = `${className} text-gray-900 bg-gray-300 shadow-inner`;
  } else {
    className = `${className} text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-inner`;
  }

  return <Link href={href}>{React.cloneElement(children, {className})}</Link>;
};

NavLink.propTypes = {
  children: PropTypes.shape({
    $$typeof: PropTypes.symbol,
    props: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  href: PropTypes.string.isRequired,
};

export default NavLink;
