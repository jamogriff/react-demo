import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { initialToDos } from './fixtures';
import ToDoForm from './ToDoForm';
import { ElementTargetedReactEvent } from './interfaces';

function App() {
  // State managed here because it's the common parent of
  // ToDoInput and ToDoList components. See:
  // https://beta.reactjs.org/learn/thinking-in-react#step-4-identify-where-your-state-should-live
  const [todos, setTodos] = useState(initialToDos);
  const [todoInput, setTodoInput] = useState('');

  const deleteToDo = (id: number) => {
    setTodos([...todos].filter(todo => todo.id !== id));
  };

  const completeToDo = (id: number) => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });
    setTodos(updatedTodos);
  };

  const turnOnEditMode = (id: number) => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isInEditMode = true;
      }

      return todo;
    });
    setTodos(updatedTodos);
  };

  // @t3 types and generics
  const updateToDo = (
    event: ElementTargetedReactEvent<HTMLInputElement>,
    id: number
  ) => {
    let { target } = event; // destructure assignment
    console.log(target.value); // error with intersection type

    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isInEditMode = false;

        if (target.value.trim().length === 0) {
          return todo;
        }

        todo.title = target.value;
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

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
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={todo.id} className="todo-item-container">
              <div className="todo-item">
                <input
                  onChange={() => completeToDo(todo.id)}
                  type="checkbox"
                  checked={todo.isComplete}
                />

                {!todo.isInEditMode ? (
                  <span
                    onDoubleClick={() => turnOnEditMode(todo.id)}
                    className={`todo-item-label ${
                      todo.isComplete ? 'line-through' : ''
                    }`}
                  >
                    {todo.title}
                  </span>
                ) : (
                  <input
                    type="text"
                    className="todo-item-input"
                    defaultValue={todo.title}
                    onBlur={event => updateToDo(event, todo.id)}
                    autoFocus
                  />
                )}
              </div>
              <button onClick={() => deleteToDo(todo.id)} className="x-button">
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>
            {todos.filter(todo => !todo.isComplete).length} items remaining
          </span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
