/* eslint-disable react/display-name */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Priority } from '../models/Priority';
import { MemoryRouter } from 'react-router-dom';
import TodoForm from 'components/TodoForm/TodoForm';
import Todo from 'models/Todo';

const withMemoryRouter = (Story: React.FC) => {
    return (
        <MemoryRouter>
            <Story />
        </MemoryRouter>
    );
};

export default {
    title: 'Todo Form',
    component: TodoForm,
    decorators: [withMemoryRouter], // Add the decorator here
} as ComponentMeta<typeof TodoForm>;

const Template: ComponentStory<typeof TodoForm> = (args) => <TodoForm {...args} />;

export const NewForm = Template.bind({});

NewForm.args = {
    sendData: (todo) => { }
};

export const EditForm = Template.bind({});

const todo: Todo = {
    done: false,
    due: new Date(),
    id: 1,
    name: 'High Priority',
    priority: Priority.High,
    text: 'This is high priority task'
};


EditForm.args = {
    todo: todo,
    sendData: (todo) => { }
};


