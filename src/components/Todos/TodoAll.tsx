import React from "react";
import useTodoStore from "../../store/use-todo-store";
import TodoItem from "./TodoItem";

const TodosAll: React.FC = () => {

    const todos = useTodoStore((state) => state.Todos).filter((todo) => !todo.done)
    return (
        <div className="flex-align-center">
            {todos.map(item => <TodoItem key={item.id} item={item} />)}
        </div>
    )
}

export default TodosAll;