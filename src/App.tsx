import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {ToDo} from './interfaces';
import {initialToDos} from "./fixtures";
import ToDoForm from "./ToDoForm";

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
            <img className={"logo"} src={logo}/>
            <h1>React ToDo Demo</h1>
          </div>
          <ToDoForm
              todoInput={todoInput}
              onTodoInputChange={setTodoInput}
              todos={todos}
              onTodoSubmit={setTodos} />
          <ul className="todo-list">
            {todos.map((todo, index) => (
              <li key={todo.id} className="todo-item-container">
                <div className="todo-item">
                  <input type="checkbox" />
                  <span className="todo-item-label">{todo.title}</span>
                   <input type="text" className="todo-item-input" value="Finish React Series" />
                </div>
                <button className="x-button">
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

            <span>3 items remaining</span>
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

