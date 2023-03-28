import { create } from "zustand";
import Todo from "../models/Todo";

interface TodoState {
  Todos: Todo[];
  getTodos: (todo: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  //   updateTodo: (todos: Todo) => void;
  removeTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
}

const useTodoStore = create<TodoState>((set) => ({
  Todos: [],
  addTodo: (todo) => set((state) => ({ Todos: [...state.Todos, todo] })),
  getTodos: (todos) => set((state) => ({ Todos: [...todos] })),
  removeTodo: (id: string) =>
    set((state) => {
      var filteredTodo = state.Todos.filter((todo) => todo.id !== id);
      return { Todos: filteredTodo };
    }),
  updateTodo: (todo) =>
    set((state) => {
      let todos = [...state.Todos];
      const todoIndex = todos.findIndex(({ id }) => todo.id === id);
      todos[todoIndex] = todo;
      return { Todos: todos };
    }),
}));

export default useTodoStore;
