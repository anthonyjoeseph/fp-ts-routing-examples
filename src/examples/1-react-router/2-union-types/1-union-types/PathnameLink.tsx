import React from 'react';
import Link from '../../common/Link';
import { Pathname } from './App';

const PathnameLink = ({
  to,
  updateLocation,
  children,
}: {
  to: Pathname;
  updateLocation: (location: Pathname) => void;
  children: string;
}) => <Link
  to={to}
  updateLocation={url => updateLocation(url as Pathname)}
  children={children}
/>;

export default PathnameLink;