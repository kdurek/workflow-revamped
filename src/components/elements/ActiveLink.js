import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

const ActiveLink = ({href, children}) => {
  const router = useRouter();

  let className = children.props.className || '';

  if (router.pathname === href) {
    className = `${className} text-3xl md:text-4xl lg:text-5xl font-bold`;
  }

  return <Link href={href}>{React.cloneElement(children, {className})}</Link>;
};

export default ActiveLink;
