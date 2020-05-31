import React from 'react';
import { VisibilityFilter } from '../AppState';
import Link from './Link';

const Footer = ({
  visibilityFilter,
  setVisibilityFilter,
}: {
  visibilityFilter: VisibilityFilter;
  setVisibilityFilter: (newVisibility: VisibilityFilter) => void;
}) => (
  <div>
    <span>Show: </span>
    <Link
      onClick={() => setVisibilityFilter('SHOW_ALL')}
      active={visibilityFilter === 'SHOW_ALL'}
    >
      All
    </Link>
    <Link
      onClick={() => setVisibilityFilter('SHOW_ACTIVE')}
      active={visibilityFilter === 'SHOW_ACTIVE'}
    >
      Active
    </Link>
    <Link
      onClick={() => setVisibilityFilter('SHOW_COMPLETED')}
      active={visibilityFilter === 'SHOW_COMPLETED'}
    >
      Completed
    </Link>
  </div>
)

export default Footer;