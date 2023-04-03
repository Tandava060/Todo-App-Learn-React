import './App.css';
import { useEffect } from 'react';
import useTodoStore from './store/use-todo-store';
import useHttp from './hooks/use-http';
import useIsLoadingStore from './store/use-is-loading-store';
import Notification from './components/UI/Notification';
import { ConfigProvider, Spin } from 'antd';
import { Outlet } from 'react-router';
import useNotificationStore from './store/use-notification-store';

function App() {
  const todoStore = useTodoStore();
  const isLoadingStore = useIsLoadingStore();
  const { makeRequest } = useHttp();
  const notiffStore = useNotificationStore();

  useEffect(() => {
    const getData = async () => {
      try {
        const dataReceived = await makeRequest('http://localhost:3000/Todos');
        todoStore.setTodos(dataReceived);
      } catch (errorMsg: unknown) {
        notiffStore.showErrorNotiff(errorMsg as string);
      }
    };
    getData();
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#647cdf',
        },
      }}
    >
      <Spin spinning={isLoadingStore.isLoading}>
        <Outlet />
        <Notification />
      </Spin>
    </ConfigProvider>

  );
}

export default App;
