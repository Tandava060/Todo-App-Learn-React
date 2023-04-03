import { AllTodosState } from 'models/AllTodosState';
import useTodoStore from 'store/use-todo-store';
import TodoItem from './TodoItem';

const TodosAll: React.FC<{ todosState: AllTodosState }> = ({ todosState }) => {
    const todoStore = useTodoStore();

    const filterTodos = () => {
        if (todosState === AllTodosState.Done) {
            return todoStore.todos.filter((todo) => todo.done);
        }
        if (todosState === AllTodosState.Todo) {
            return todoStore.todos.filter((todo) => !todo.done);
        } else {
            return todoStore.todos;
        }
    };

    const todos = filterTodos();

    return (
        <div className="flex-align-center">
            {todos.map(item => <TodoItem data-testid="mock-todo-item" key={item.id} item={item} />)}
        </div>
    );
};

export default TodosAll;