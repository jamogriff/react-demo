import { ToDo } from './interfaces';

export const initialToDos = [
  {
    id: 1,
    title: 'Modify styles',
    isComplete: true,
    isInEditMode: false,
  },
  {
    id: 2,
    title: 'Add state',
    isComplete: false,
    isInEditMode: false,
  },
  {
    id: 3,
    title: 'Practice Typescript',
    isComplete: false,
    isInEditMode: false,
  },
] as ToDo[];
