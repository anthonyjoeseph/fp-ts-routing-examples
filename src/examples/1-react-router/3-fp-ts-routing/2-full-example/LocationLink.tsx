import React from 'react';
import Link from '../../common/Link';
import { Location, parser, formatter } from './App';

const LocationLink = ({
  to,
  updateLocation,
  children,
}: {
  to: Location;
  updateLocation: (location: Location) => void;
  children: string;
}) => <Link
  to={formatter(to)}
  updateLocation={url => updateLocation(parser(url))}
  children={children}
/>;

export default LocationLink;