import React, { FunctionComponent } from 'react';

const Link: FunctionComponent<{
  active: boolean;
  onClick: () => void;
}> = ({
  active,
  onClick,
  children,
}) => (
  <button
    onClick={onClick}
    disabled={active}
    style={{
      marginLeft: '4px'
    }}
  >
    {children}
  </button>
)

export default Link;