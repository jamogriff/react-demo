import { ToDo } from '../interfaces';
import ListItem from './ListItem';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  todos: ToDo[];
  saveTodos: Dispatch<SetStateAction<ToDo[]>>;
  filter: string;
  updateFilter: Dispatch<SetStateAction<string>>;
}

export default function ToDoList(props: Props) {
  const todos = props.todos;
  const currentFilter = props.filter;

  const checkAllTodos = () => {
    let checkedTodos = todos.map(todo => {
      todo.isComplete = true;
      return todo;
    });

    props.saveTodos(checkedTodos);
  };

  const removeCompletedTodos = () => {
    let updatedTodos = todos.filter(todo => {
      return !todo.isComplete;
    });

    props.saveTodos(updatedTodos);
  };

  const getFilteredTodos = (): ToDo[] => {
    if (currentFilter === 'complete') {
      return todos.filter(todo => {
        return todo.isComplete;
      });
    } else if (currentFilter === 'incomplete') {
      return todos.filter(todo => {
        return !todo.isComplete;
      });
    } else {
      return todos;
    }
  };

  const addActiveClass = (filter: string): string => {
    return currentFilter === filter ? 'filter-button-active' : '';
  }

  return (
    <>
      <ul className="todo-list">
        {getFilteredTodos().map((todo, index) => (
          <ListItem
            key={todo.id}
            todo={todo}
            todos={todos}
            saveTodos={props.saveTodos}
          />
        ))}
      </ul>

      <div className="check-all-container">
        <div>
          <div className="button" onClick={checkAllTodos}>
            Check All
          </div>
        </div>

        <span>
          {todos.filter(todo => !todo.isComplete).length} items remaining
        </span>
      </div>

      <div className="other-buttons-container">
        <div>
          <button
            className={`button filter-button ${addActiveClass('all')}`}
            onClick={() => {
              props.updateFilter('all');
            }}
          >
            All
          </button>
          <button
            className={`button filter-button ${addActiveClass('incomplete')}`}
            onClick={() => {
              props.updateFilter('incomplete');
            }}
          >
            Incomplete
          </button>
          <button
            className={`button filter-button ${addActiveClass('complete')}`}
            onClick={() => {
              props.updateFilter('complete');
            }}
          >
            Completed
          </button>
        </div>
        <div>
          <button className="button" onClick={removeCompletedTodos}>
            Clear completed
          </button>
        </div>
      </div>
    </>
  );
}
