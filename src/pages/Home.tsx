import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import PriorityList from 'components/Priority/PriorityList';
import TodosAll from 'components/Todos/TodoAll';
import TodosSelectState from 'components/Todos/TodoSelectState';
import { AllTodosState } from 'models/AllTodosState';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    const [todosAllState, setTodosAllState] = useState(AllTodosState.Todo);

    const changeAllTodosState = (changedState: AllTodosState) => setTodosAllState(changedState);

    return (<div className="App">
        <h1 className='todo-header'>Todo App</h1>
        <div style={{ margin: '2rem' }} className='flex-align-center justify-space-between'>
            <PriorityList />
            <div className='flex-align-center'>
                <TodosSelectState changeState={changeAllTodosState} />
                <Link style={{ marginLeft: '20px' }} to="/todo/new"><Button danger type='primary'>Add <PlusOutlined /></Button></Link>
            </div>
        </div>
        <TodosAll todosState={todosAllState} />
    </div>);
};

export default Home;