import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

const setup = () => {
  render(<App />);
  const input = screen.getByLabelText('create-todo-input');
  return {
    input
  }
}

const createToDo = (input: HTMLElement, newVal: string) => {
  fireEvent.change(input, {
    target: {
      value: newVal
    }
  });
  fireEvent.submit(input);
}

test('renders initial todo item', () => {
  setup();
  const linkElement = screen.getByText(/Practice Typescript/);
  expect(linkElement).toBeInTheDocument();
});

test('adds new todo item', () => {
  const {input} = setup();
  createToDo(input, 'test the app');

  const linkElement = screen.getByText(/test the app/);
  expect(linkElement).toBeInTheDocument();
});

test('marks todo complete', () => {
  const {input} = setup();
  createToDo(input, 'test the app');

  let checkbox = screen.getByLabelText('mark-complete-4');
  fireEvent.click(checkbox);

  const linkElement = screen.getByText(/test the app/);
  expect(linkElement).toHaveClass('line-through');
})

test('deletes todo', () => {
  const {input} = setup();
  createToDo(input, 'test the app');

  let deleteButton = screen.getByLabelText('delete-todo-4');
  fireEvent.click(deleteButton);

  const linkElement = screen.queryByText(/test the app/);
  expect(linkElement).toBeNull();
})
