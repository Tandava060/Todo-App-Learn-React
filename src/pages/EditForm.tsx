import TodoForm from '../components/TodoForm/TodoForm';
import useHttp from '../hooks/use-http';
import Todo from '../models/Todo';
import useNotificationStore from '../store/use-notification-store';
import useTodoStore from '../store/use-todo-store';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

const EditForm = () => {

    const { id } = useParams();
    const { makeRequest } = useHttp();
    const todoStore = useTodoStore();
    const notiffStore = useNotificationStore();
    const [data, setData] = useState<Todo>();
    const getData = useCallback(
        async () => {
            try {
                const todo = await makeRequest(`http://localhost:3000/Todos/${id}`);
                setData({ ...todo, due: new Date(todo.due) });
            } catch (errorMsg: unknown) {
                notiffStore.showSuccessNotiff(errorMsg as string);
            }
        },
        [],
    );

    useEffect(() => {
        getData();
    }, [getData]);

    const editData = async (todoToEdit: Omit<Todo, 'id'> | Todo, reset: () => void) => {
        try {
            const dataReceived = await makeRequest(`http://localhost:3000/Todos/${id}`, 'PUT', todoToEdit);
            todoStore.updateTodo(dataReceived);
            notiffStore.showSuccessNotiff('Todo has successfully been edited!');
            reset();
        } catch (errorMsg: unknown) {
            notiffStore.showSuccessNotiff(errorMsg as string);
        }
    };
    return (<TodoForm sendData={editData} todo={data} />);

};

export default EditForm;