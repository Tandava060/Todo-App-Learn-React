import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Priority } from '../models/Priority';
import Todo from '../models/Todo';
import '@testing-library/jest-dom/extend-expect';
import useTodoStore from '../store/use-todo-store';
import TodosAll from '../components/Todos/TodoAll';
import { BrowserRouter } from 'react-router-dom';
import { AllTodosState } from '../models/AllTodosState';
import TodoItem from '../components/Todos/TodoItem';


const mockTodo: Todo =
{
    done: false,
    due: new Date(),
    id: 1,
    name: 'Test1',
    priority: Priority.High,
    text: 'Test1 text'
};

describe('Todo Item', () => {
    it('should render Todo with mock todo data', async () => {
        render(<TodoItem item={mockTodo} />, { wrapper: BrowserRouter });

        await waitFor(() => {
            expect(screen.getByText(mockTodo.name)).toBeInTheDocument();
        });
    });


    it('should render delete modal on delete action click', async () => {
        render(<TodoItem item={mockTodo} />, { wrapper: BrowserRouter });

        const deleteButton = screen.getByTestId('delete-button');

        await act(async () => {
            fireEvent.click(deleteButton);
        });

        await waitFor(() => {
            expect(
                screen.getByText((content, element) => {
                    return element?.tagName.toLowerCase() === 'p' && content.includes('Are you sure you want to delete task');
                })
            ).toBeInTheDocument();
        });
    });

    it('should render complete modal on complete action click', async () => {
        render(<TodoItem item={mockTodo} />, { wrapper: BrowserRouter });


        const completeButton = screen.getByTestId('complete-button');

        await act(async () => {
            fireEvent.click(completeButton);
        });

        await waitFor(() => {
            expect(
                screen.getByText((content, element) => {
                    return element?.tagName.toLowerCase() === 'p' && content.includes('Have you completed task');
                })
            ).toBeInTheDocument();
        });
    });

});
