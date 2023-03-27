# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# TODO App

## Setup project

- Create project skeleton using [Create React App](https://create-react-app.dev/). Application should use TypeScript (for CRA use switch `npx create-react-app my-app --template typescript`). If you are familiar with other tools e.g. [Vite](https://vitejs.dev/) you can use those tools.
- Application should use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit tests.

## Backend

We want to focus on frontend work, so for backend we will use JSON Server [JSON Server GitHub page](https://github.com/typicode/json-server). It is a fake REST API Server.

## Backlog

### Data model

#### ToDo Item

- Done (boolean true/false)
- Name (short text)
- Priority (Low, Normal, High)
- Due date
- Text (long text)

### Items list screen

On this screen user should be able to see list of to do items and its state.

### Delete item

Add delete button to each item on list list screen. Using this button user should be able to remove ToDo item.

### Add to do item

#### Create add ToDo item form

Using this screen user should be able to add new ToDo item.
At the beginning please create a form using just React.  
We need to collect all the data about ToDo item (See Data model section).

#### Use libraries to handle the form and validation

Use [React Hook Form](https://react-hook-form.com/) to handle form and [Zod](https://github.com/colinhacks/zod) for validation.

### Edit existing item

Modify create ToDoItem screen to allow user editing existing item. Add edit button to Items list screen that will redirect user to edit form.

#### Nice to have

- Unit tests
- [Storybook](https://storybook.js.org/)
- [React Query](https://react-query-v3.tanstack.com/)
- Eslint
- Test coverage
