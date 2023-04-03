import TodoForm from 'components/TodoForm/TodoForm';
import useHttp from 'hooks/use-http';
import Todo from 'models/Todo';
import useNotificationStore from 'store/use-notification-store';
import useTodoStore from 'store/use-todo-store';

const NewForm = () => {


    const { makeRequest } = useHttp();
    const todoStore = useTodoStore();
    const notiffStore = useNotificationStore();

    const newdata = async (newTodo: Omit<Todo, 'id'>, reset: () => void) => {
        try {
            const dataReceived = await makeRequest('http://localhost:3000/Todos', 'POST', newTodo);
            todoStore.addTodo(dataReceived);
            notiffStore.showSuccessNotiff('New Todo has successfully been created!');
            reset();
        } catch (errorMsg: unknown) {
            notiffStore.showSuccessNotiff(errorMsg as string);
        }
    };

    return (<TodoForm sendData={newdata} />);

};

export default NewForm;