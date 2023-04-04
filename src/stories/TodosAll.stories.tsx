/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import TodosAll from 'components/Todos/TodoAll';
import { AllTodosState } from 'models/AllTodosState';
import useTodoStore from 'store/use-todo-store';
import { Priority } from 'models/Priority';
import Todo from 'models/Todo';

const withMemoryRouter = (Story: React.FC) => {
    return (
        <MemoryRouter>
            <Story />
        </MemoryRouter>
    );
};

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
        priority: Priority.Low,
        text: 'Test2 text'
    },
    {
        done: false,
        due: new Date(),
        id: 3,
        name: 'Test3',
        priority: Priority.Normal,
        text: 'Test3 text'
    },
];



export default {
    title: 'Todos List',
    component: TodosAll,
    decorators: [withMemoryRouter], // Add the decorator here
} as ComponentMeta<typeof TodosAll>;



// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TodosAll> = (args) => {

    const todoStore = useTodoStore;

    useEffect(() => {
        todoStore.setState({ todos: mockTodos });
    }, [todoStore]);


    return <TodosAll {...args} />;
};

export const All = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
All.args = {
    todosState: AllTodosState.All
};

export const Done = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Done.args = {
    todosState: AllTodosState.Done
};

export const To_do = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
To_do.args = {
    todosState: AllTodosState.Todo
};