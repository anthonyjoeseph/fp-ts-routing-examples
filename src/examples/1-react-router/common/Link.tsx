import React from 'react';

const Link = ({
  to,
  updatePathname,
  children,
}: {
  to: string;
  updatePathname: (to: string) => void;
  children: string;
}) => (
  <a
    href={to}
    onClick={(event) => {
      event.preventDefault();
      updatePathname(to);
    }}
  >
    {children}
  </a>
);

export default Link;