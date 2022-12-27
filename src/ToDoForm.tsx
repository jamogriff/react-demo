import React, {FormEvent, ChangeEvent} from 'react';
import {ToDo} from "./interfaces";

export interface Props {
    todoInput: string,
    onTodoInputChange: any,
    todos: ToDo[],
    onTodoSubmit: any,
}

export default function ToDoForm(props: Props) {
  const addTodo = (event: FormEvent) => {
    event.preventDefault(); // don't execute form action

      if (props.todoInput.trim().length === 0) {
          return;
      }

    let lastTodo = props.todos.at(-1);

    let newTodo: ToDo = {
      id: lastTodo?.id ? lastTodo.id + 1 : 0,
      title: props.todoInput,
      isComplete: false
    };

    props.onTodoSubmit([...props.todos, newTodo]);
    props.onTodoInputChange('');
  };

  const handleInput = (event: ChangeEvent) => {
    // Interesting... need to cast as type here because
    // any given HTMLElement isn't guaranteed to have a value property
    props.onTodoInputChange((event.target as HTMLInputElement).value);
  };

    return (
        <form action="#" onSubmit={addTodo}>
            <input
              type="text"
              value={props.todoInput}
              onChange={handleInput}
              className="todo-input"
              placeholder="What's next?"
            />
        </form>
    )
}