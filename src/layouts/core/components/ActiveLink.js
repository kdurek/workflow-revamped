import {useRouter} from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

const ActiveLink = ({children, href}) => {
  const router = useRouter();

  let className = children.props.className || '';

  if (router.pathname === href) {
    className = `${className} transform scale-110 bg-coolGray-400 hover:bg-coolGray-400 shadow-md`;
  } else {
    className = `${className} text-coolGray-600`;
  }

  return <Link href={href}>{React.cloneElement(children, {className})}</Link>;
};

ActiveLink.propTypes = {
  children: PropTypes.object,
  href: PropTypes.string,
};

export default ActiveLink;
