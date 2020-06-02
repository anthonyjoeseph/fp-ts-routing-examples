import React from 'react';

const Todo = ({
  onClick,
  completed,
  text,
}: {
  onClick: () => void;
  completed: boolean;
  text: string;
}) => (
  <li
    aria-label={`todo: ${text}`}
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

export default Todo;