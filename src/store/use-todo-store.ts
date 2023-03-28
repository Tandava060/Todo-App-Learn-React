import { create } from "zustand";
import Todo from "../models/Todo";

interface TodoState {
  Todos: Todo[];
  getTodos: (by: Todo[]) => void;
  addTodo: (by: Todo) => void;
  //   updateTodo: (by: Todo) => void;
  removeTodo: (id: string) => void;
}

const useTodoStore = create<TodoState>((set) => ({
  Todos: [],
  addTodo: (by) => set((state) => ({ Todos: [...state.Todos, by] })),
  getTodos: (by) => set((state) => ({ Todos: [...by] })),
  removeTodo: (id: string) =>
    set((state) => {
      var filteredTodo = state.Todos.filter((todo) => todo.id !== id);
      return { Todos: filteredTodo };
    }),
}));

export default useTodoStore;
