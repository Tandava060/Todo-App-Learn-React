import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import TodoForm from 'components/TodoForm/TodoForm';
import { Priority } from 'models/Priority';
import { BrowserRouter } from 'react-router-dom';


const todo = {
    done: false,
    due: new Date(),
    id: 2,
    name: 'Test2',
    priority: Priority.High,
    text: 'Test2 text'
};

describe('TodoForm', () => {

    it('should render with existing values if data passed', () => {

        render(<TodoForm todo={todo} sendData={() => { }} />, { wrapper: BrowserRouter });

        const titleInputElement = screen.getByTestId('title');
        const dateInputElement = screen.getByTestId('date');
        const prioritySelectElement = screen.getByTestId('priority');
        const textereaElement = screen.getByTestId('text');

        expect(titleInputElement).toHaveValue(todo.name);
        expect(dateInputElement).toHaveValue(todo.due.toISOString().slice(0, 10));
        expect(prioritySelectElement).toHaveValue(todo.priority.toString());
        expect(textereaElement).toHaveValue(todo.text);

    });

    it('should render with default values if no data passed', () => {

        render(<TodoForm sendData={() => { }} />, { wrapper: BrowserRouter });

        const titleInputElement = screen.getByTestId('title');
        const dateInputElement = screen.getByTestId('date');
        const prioritySelectElement = screen.getByTestId('priority');
        const textereaElement = screen.getByTestId('text');

        expect(titleInputElement).toHaveValue('');
        expect(dateInputElement).toHaveValue('');
        expect(prioritySelectElement).toHaveValue('0');
        expect(textereaElement).toHaveValue('');

    });

    it('should render error message Name is Required upon submiting form if Name is empty', async () => {

        render(<TodoForm sendData={() => { }} />, { wrapper: BrowserRouter });

        const submitButton = screen.getByRole('button', { name: 'Submit' });

        await act(async () => {
            fireEvent.click(submitButton);
        });


        await waitFor(() => {
            expect(screen.getByText('Name is Required')).toBeInTheDocument();
        });

    });

    it('should not render error message upon submiting form if Name is not empty', async () => {

        render(<TodoForm sendData={() => { }} />, { wrapper: BrowserRouter });

        const titleInputElement = screen.getByTestId('title');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        await act(async () => {
            fireEvent.change(titleInputElement, { target: { value: todo.text } });
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(() => screen.getByText('Name is Required')).toThrowError();
        });

    });

    it('should render error message Due Date is Required upon submiting form if Date is empty', async () => {

        render(<TodoForm sendData={() => { }} />, { wrapper: BrowserRouter });

        const submitButton = screen.getByRole('button', { name: 'Submit' });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(screen.getByText('Due Date is Required')).toBeInTheDocument();
        });

    });

    it('should not render error message upon submiting form if Date is not empty', async () => {

        render(<TodoForm sendData={() => { }} />, { wrapper: BrowserRouter });

        const dateInputElement = screen.getByTestId('date');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        await act(async () => {
            fireEvent.change(dateInputElement, { target: { value: todo.due.toISOString().slice(0, 10) } });
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(() => screen.getByText('Due Date is Required')).toThrowError();
        });

    });

    it('should render error message Due date should be greater than today upon submiting form if Date is before today', async () => {

        render(<TodoForm sendData={() => { }} />, { wrapper: BrowserRouter });

        const dateInputElement = screen.getByTestId('date');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        await act(async () => {
            fireEvent.change(dateInputElement, { target: { value: new Date('10/03/2022').toISOString().slice(0, 10) } });
            fireEvent.click(submitButton);
        });


        await waitFor(() => {
            expect(screen.getByText('Due date should be greater than today.')).toBeInTheDocument();
        });

    });

    it('should not render error message upon submiting form if Date is valid', async () => {

        render(<TodoForm sendData={() => { }} />, { wrapper: BrowserRouter });

        const dateInputElement = screen.getByTestId('date');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        await act(async () => {
            fireEvent.change(dateInputElement, { target: { value: new Date('10/03/2024').toISOString().slice(0, 10) } });
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(() => screen.getByText('Due date should be greater than today.')).toThrowError();
        });

    });


});
