import React, {ChangeEvent, FormEvent, useState} from 'react';
import logo from './logo.svg';
import './App.css';

export interface ToDo {
  id: number,
  title: string,
  isComplete: boolean
}

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Modify styles',
      isComplete: true
    },
    {
      id: 2,
      title: 'Add state',
      isComplete: false
    },
    {
      id: 3,
      title: 'Practice Typescript',
      isComplete: false
    },
  ] as ToDo[]);

  const [todoInput, setTodoInput] = useState('');

  const addTodo = (event: FormEvent) => {
    event.preventDefault(); // don't execute form action

    let lastTodo = todos.at(-1);

    let newTodo: ToDo = {
      id: lastTodo?.id ? lastTodo.id + 1 : 0,
      title: todoInput,
      isComplete: false
    };
    setTodos([...todos, newTodo]);
    setTodoInput('');
  };

  const handleInput = (event: ChangeEvent) => {
    // Interesting... need to cast as type here because
    // any given HTMLElement isn't guaranteed to have a value property
    setTodoInput((event.target as HTMLInputElement).value);
  };

  return (
    <div className="todo-app-container">
        <div className="todo-app">
          <div className="header">
            <img className={"logo"} src={logo}/>
            <h1>React ToDo Demo</h1>
          </div>
          <form action="#" onSubmit={addTodo}>
            <input
              type="text"
              value={todoInput}
              onChange={handleInput}
              className="todo-input"
              placeholder="What's next?"
            />
          </form>

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

