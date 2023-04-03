import { act, render, screen, waitFor } from '@testing-library/react';
import TodosAll from 'components/Todos/TodoAll';
import { AllTodosState } from 'models/AllTodosState';
import { Priority } from 'models/Priority';
import Todo from 'models/Todo';
import { BrowserRouter } from 'react-router-dom';
import useTodoStore from 'store/use-todo-store';


const mockTodos: Todo[] = [
    {
        done: false,
        due: new Date(),
        id: 1,
        name: 'Test1',
        priority: Priority.High,
        text: 'Test1 text'
    },
    {
        done: true,
        due: new Date(),
        id: 2,
        name: 'Test2',
        priority: Priority.High,
        text: 'Test2 text'
    },
    {
        done: false,
        due: new Date(),
        id: 3,
        name: 'Test3',
        priority: Priority.High,
        text: 'Test3 text'
    },
];

describe('TodosAll', () => {
    it('should render list of not yet completed todos when state is todo', async () => {
        render(<TodosAll todosState={AllTodosState.Todo} />, { wrapper: BrowserRouter });
        await act(async () => useTodoStore.setState({ todos: mockTodos }));
        const items = screen.getAllByTestId('todo-item');

        await waitFor(() => {
            expect(items.length).toBe(2);
        });
    });

    it('should render list of completed todos when state is Done', async () => {
        render(<TodosAll todosState={AllTodosState.Done} />, { wrapper: BrowserRouter });
        await act(async () => useTodoStore.setState({ todos: mockTodos }));
        const items = screen.getAllByTestId('todo-item');

        await waitFor(() => {
            expect(items.length).toBe(1);
        });
    });

    it('should render list of All todos when state is All', async () => {
        render(<TodosAll todosState={AllTodosState.All} />, { wrapper: BrowserRouter });
        await act(async () => useTodoStore.setState({ todos: mockTodos }));
        const items = screen.getAllByTestId('todo-item');

        await waitFor(() => {
            expect(items.length).toBe(3);
        });
    });
});
