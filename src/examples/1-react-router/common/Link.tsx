import React from 'react';

const Link = ({
  to,
  updateLocation,
  children,
}: {
  to: string;
  updateLocation: (to: string) => void;
  children: string;
}) => (
  <a
    href={to}
    onClick={(event) => {
      event.preventDefault();
      updateLocation(to);
    }}
  >
    {children}
  </a>
);

export default Link;