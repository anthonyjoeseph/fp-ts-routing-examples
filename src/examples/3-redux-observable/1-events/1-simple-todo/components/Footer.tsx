import React from 'react';
import { TodoVisibility } from '../AppState';
import Link from './Link';

const Footer = ({
  todoVisibility,
  setTodoVisibility,
}: {
  todoVisibility: TodoVisibility;
  setTodoVisibility: (newVisibility: TodoVisibility) => void;
}) => (
  <div>
    <span>Show: </span>
    <Link
      onClick={() => setTodoVisibility('SHOW_ALL')}
      active={todoVisibility === 'SHOW_ALL'}
    >
      All
    </Link>
    <Link
      onClick={() => setTodoVisibility('SHOW_ACTIVE')}
      active={todoVisibility === 'SHOW_ACTIVE'}
    >
      Active
    </Link>
    <Link
      onClick={() => setTodoVisibility('SHOW_COMPLETED')}
      active={todoVisibility === 'SHOW_COMPLETED'}
    >
      Completed
    </Link>
  </div>
)

export default Footer;