import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { initialToDos } from './fixtures';
import ToDoForm from './components/ToDoForm';
import ToDoList from './components/ToDoList';

function App() {
  // State managed here because it's the common parent of
  // ToDoInput and ToDoList components. See:
  // https://beta.reactjs.org/learn/thinking-in-react#step-4-identify-where-your-state-should-live
  const [todos, setTodos] = useState(initialToDos);
  const [todoInput, setTodoInput] = useState('');

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <div className="header">
          <img className={'logo'} src={logo} />
          <h1>React ToDo Demo</h1>
        </div>
        <ToDoForm
          todoInput={todoInput}
          onTodoInputChange={setTodoInput}
          todos={todos}
          onTodoSubmit={setTodos}
        />
        <ToDoList todos={todos} saveTodos={setTodos} />
      </div>
    </div>
  );
}

export default App;
