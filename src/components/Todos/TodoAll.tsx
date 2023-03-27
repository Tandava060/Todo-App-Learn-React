import React from "react";
import Todo from "../../models/Todo";
import TodoItem from "./TodoItem";

const TodosAll: React.FC<{ items: Todo[] }> = (props) => {
    return (
        <div className="flex-align-center">
            {props.items.map(item => <TodoItem key={item.id} item={item} />)}
        </div>
    )
}

export default TodosAll;