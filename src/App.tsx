/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import TodosAll from './components/Todos/TodoAll';
import PriorityList from './components/Priority/PriorityList';
import { Button, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from 'react';
import useTodoStore from './store/use-todo-store';
import useHttp from './hooks/use-http';
import useIsLoadingStore from './store/use-is-loading-store';
import Notification from './components/UI/Notification';

function App() {
  const todoStore = useTodoStore();
  const isLoadingStore = useIsLoadingStore();
  const { makeRequest } = useHttp();

  useEffect(() => {

    const getData = async () => {
      try {
        const dataReceived = await makeRequest('http://localhost:3000/Todos');
        todoStore.getTodos(dataReceived);
      } catch (errorMsg) {
        console.log("Error while deleting:", errorMsg);
      }
    }
    getData();
  }, [])

  return (
    <Spin spinning={isLoadingStore.isLoading}>
      <div className="App">
        <h1 className='todo-header'>Todo App</h1>
        <div style={{ margin: '2rem' }} className='flex-align-center justify-space-between'>
          <PriorityList />
          <Link to="/new"><Button danger type='primary'>Add <PlusOutlined /></Button></Link>
        </div>
        <TodosAll />
      </div>
      <Notification />
    </Spin>
  );
}

export default App;
