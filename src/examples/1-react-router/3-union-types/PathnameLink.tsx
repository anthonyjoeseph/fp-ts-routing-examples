import React from 'react';
import Link from '../common/Link';
import { Pathname } from './App';

const PathnameLink = ({
  to,
  updatePathname,
  children,
}: {
  to: Pathname;
  updatePathname: (pathname: Pathname) => void;
  children: string;
}) => <Link
  to={to}
  updatePathname={() => updatePathname(to)}
  children={children}
/>;

export default PathnameLink;