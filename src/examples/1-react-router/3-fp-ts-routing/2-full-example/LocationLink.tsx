import React from 'react';
import Link from '../../common/Link';
import { Location, formatter } from './App';

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
  updateLocation={() => updateLocation(to)}
  children={children}
/>;

export default LocationLink;