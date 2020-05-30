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
            return
          }
          addTodo(text);
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

export default AddTodo;