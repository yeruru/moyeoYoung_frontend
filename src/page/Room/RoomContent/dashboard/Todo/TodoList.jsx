import React from 'react';
import { List } from '@mui/material';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleComplete, removeTodo, updateTodo }) {
  return (
    
    <List style={ {display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleComplete={toggleComplete} removeTodo={removeTodo} updateTodo={updateTodo}/>
      ))}
    </List>
  );
}

export default TodoList;
