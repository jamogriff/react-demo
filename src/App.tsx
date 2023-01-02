import React, { useEffect, useRef, useState } from 'react';
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
  const inputField = useRef(null);

  // @r components are mounted twice in development
  // See: https://stackoverflow.com/questions/72238175/why-useeffect-running-twice-and-how-to-handle-it-well-in-react
  useEffect(() => {
    console.log('lol component mounted');
    if (inputField !== null) {
      // @t4 - casting and non-null assertion
      // Typescript compiler not smart enough to know this wouldn't be null
      // See: https://stackoverflow.com/questions/38874928/operator-in-typescript-after-object-method
      let input = inputField.current! as HTMLInputElement;
      input.focus();
    }
    // note: typically a cleanup function runs at end
  }, []);

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <div className="header">
          <img alt="React logo" className={'logo'} src={logo} />
          <h1>React ToDo Demo</h1>
        </div>
        <ToDoForm
          todoInput={todoInput}
          onTodoInputChange={setTodoInput}
          todos={todos}
          onTodoSubmit={setTodos}
          inputRef={inputField}
        />

        {todos.length > 0 ? (
          <ToDoList todos={todos} saveTodos={setTodos} />
        ) : (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h3>You're all caught up!</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
