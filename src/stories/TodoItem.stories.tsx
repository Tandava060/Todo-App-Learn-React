/* eslint-disable react/display-name */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TodoItem from '../components/Todos/TodoItem';
import { Priority } from '../models/Priority';
import { MemoryRouter } from 'react-router-dom';

const withMemoryRouter = (Story: React.FC) => {
    return (
        <MemoryRouter>
            <Story />
        </MemoryRouter>
    );
};


export default {
    title: 'Todo Item',
    component: TodoItem,
    decorators: [withMemoryRouter], // Add the decorator here
} as ComponentMeta<typeof TodoItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TodoItem> = (args) => <TodoItem {...args} />;

export const High = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
High.args = {
    item: {
        done: false,
        due: new Date(),
        id: 1,
        name: 'High Priority',
        priority: Priority.High,
        text: 'This is high priority task'
    }
};


export const Normal = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Normal.args = {
    item: {
        done: false,
        due: new Date(),
        id: 1,
        name: 'Normal Priority',
        priority: Priority.Normal,
        text: 'This is normal priority task'
    }
};

export const Low = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Low.args = {
    item: {
        done: false,
        due: new Date(),
        id: 1,
        name: 'Low Priority',
        priority: Priority.Low,
        text: 'This is low priority task'
    }
};