import { ToDo } from '../interfaces';
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

interface Props {
  todo: ToDo;
  todos: ToDo[];
  saveTodos: Dispatch<SetStateAction<ToDo[]>>;
}

export default function ListItem(props: Props) {
  const todos = props.todos;
  const todo = props.todo;
  const saveTodos = props.saveTodos;

  const destroy = (id: number) => {
    saveTodos([...todos].filter(todo => todo.id !== id));
  };

  const complete = (id: number) => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });
    saveTodos(updatedTodos);
  };

  // @t3 types and generics
  const update = (
    event: SyntheticEvent<HTMLElement>,
    id: number,
    cancelled?: boolean
  ) => {
    let target = event.target as HTMLInputElement;
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        if (target.value.trim().length === 0 || cancelled) {
          todo.isInEditMode = false;
          return todo;
        }

        todo.isInEditMode = false;
        todo.title = target.value;
      }

      return todo;
    });

    saveTodos(updatedTodos);
  };

  const turnOnEditMode = (id: number) => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isInEditMode = true;
      }

      return todo;
    });
    saveTodos(updatedTodos);
  };

  return (
    <li className="todo-item-container">
      <div className="todo-item">
        <input
          onChange={() => complete(todo.id)}
          aria-label={"mark-complete-" + todo.id}
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
            onBlur={event => update(event, todo.id)}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                update(event, todo.id);
              } else if (event.key === 'Escape') {
                update(event, todo.id, true);
              }
            }}
            autoFocus
          />
        )}
      </div>
      <button
        aria-label={"delete-todo-" + todo.id}
        onClick={() => destroy(todo.id)}
        className="x-button"
      >
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
  );
}
