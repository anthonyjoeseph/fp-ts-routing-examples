import React, { useState } from 'react';

const AddTodo = ({
  addTodo,
}: {
  addTodo: (text: string) => void;
}) => {
  const [text, setText] = useState('');
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!text.trim()) {
            return;
          }
          addTodo(text);
        }}
      >
        <input
          type="text"
          aria-label="New Todo Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          aria-label="Add Todo"
          type="submit"
        >
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default AddTodo;