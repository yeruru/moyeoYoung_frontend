import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import FilterButtons from './FilterButtons';
import Confetti from 'confetti-js';

function TodoApp({roomId, state}) {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load todos from backend
    axios.get(process.env.REACT_APP_BURL+`/todos/${roomId}`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, [roomId]);

  function addTodo(todo) {
    axios.post(process.env.REACT_APP_BURL+`/todos/${roomId}`, todo)
      .then((response) => {
        setTodos(prevTodos => [...prevTodos, response.data]);
      })
      .catch((error) => {
        console.error('Error adding todo: ', error);
      });
  }

  function toggleComplete(id) {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...todo, completed: todo.completed ? 0 : 1 };
    
    if (todo.completed === 0) {
      var confettiSettings = { target: 'my-canvas' };
      var confetti = new Confetti(confettiSettings);
      confetti.render();
  
      var myCanvas = document.getElementById('my-canvas');
      myCanvas.style.display = 'block';
      
      // Automatically clear the confetti after a few seconds
      setTimeout(() => {
        confetti.clear();
        myCanvas.style.display = 'none';
      }, 3000);
    }

    axios.put(process.env.REACT_APP_BURL+`/todos/${id}`, updatedTodo)
      .then((response) => {
        setTodos(
          todos.map((todo) => todo.id === id ? response.data : todo)
        );
      })
      .catch((error) => {
        console.error('Error updating todo: ', error);
      });
  }

  function removeTodo(id) {
    axios.delete(process.env.REACT_APP_BURL+`/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting todo: ', error);
      });
  }

  function updateTodo(updatedTodo) {
    axios.put(process.env.REACT_APP_BURL+`/todos/${updatedTodo.id}`, updatedTodo)
      .then((response) => {
        setTodos(todos.map((todo) => todo.id === response.data.id ? response.data : todo));
      })
      .catch((error) => {
        console.error('Error updating todo: ', error);
      });
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed;
    }
    if (filter === 'completed') {
      return todo.completed;
    }
    return true;
  });

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',}}>
          
          <FilterButtons setFilter={setFilter} />
          <AddTodoForm addTodo={addTodo} state={state}/>
          <TodoList todos={filteredTodos} toggleComplete={toggleComplete} removeTodo={removeTodo} updateTodo={updateTodo}/>
        </div>
        
    </>

  );
}

export default TodoApp;