import React from 'react';
import Link from '../../common/Link';
import { Location, parse, format } from './App';

const LocationLink = ({
  to,
  updateLocation,
  children,
}: {
  to: Location;
  updateLocation: (location: Location) => void;
  children: string;
}) => <Link
  to={format(to)}
  updateLocation={url => updateLocation(parse(url))}
  children={children}
/>;

export default LocationLink;