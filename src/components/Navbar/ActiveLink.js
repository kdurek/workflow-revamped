import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

const ActiveLink = ({children, href}) => {
  const router = useRouter();

  let className = children.props.className || '';

  if (router.pathname === href) {
    className = `${className} bg-coolGray-400`;
  }

  return <Link href={href}>{React.cloneElement(children, {className})}</Link>;
};

export default ActiveLink;
