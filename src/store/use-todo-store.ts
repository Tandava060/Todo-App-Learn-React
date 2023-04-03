import Todo from 'models/Todo';
import { create } from 'zustand';

export interface TodoState {
  todos: Todo[];
  setTodos: (todo: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  removeTodo: (id: number) => void;
  updateTodo: (todo: Todo) => void;
}

const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  setTodos: (todos) => set(() => ({ todos: [...todos] })),
  removeTodo: (id: number) =>
    set((state) => {
      const filteredTodo = state.todos.filter((todo) => todo.id !== id);
      return { todos: filteredTodo };
    }),
  updateTodo: (todo) =>
    set((state) => {
      const todos = [...state.todos];
      const todoIndex = todos.findIndex(({ id }) => todo.id === id);
      todos[todoIndex] = todo;
      return { todos: todos };
    }),
}));

export default useTodoStore;
