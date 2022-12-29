import { ToDo } from '../interfaces';
import ListItem from './ListItem';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  todos: ToDo[];
  saveTodos: Dispatch<SetStateAction<ToDo[]>>
}

export default function ToDoList(props: Props) {
  const todos = props.todos;

  return (
    <>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <ListItem key={todo.id} todo={todo} todos={todos} saveTodos={props.saveTodos} />
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
    </>
  );
}
