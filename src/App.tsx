import './App.css';
import TodosAll from './components/Todos/TodoAll';
import Todo from './models/Todo';
import { Priority } from './models/Priority';
import PriorityList from './components/Priority/PriorityList';

function App() {

  const todo: Todo[] = [
    {
      id: '1',
      done: false,
      due: new Date(),
      name: 'Learning react',
      priority: Priority.Low,
      text: 'Learning for upskill'
    },
    {
      id: '2',
      done: false,
      due: new Date(),
      name: 'Learning typescript',
      priority: Priority.Low,
      text: 'Learning for upskill'
    },
    {
      id: '3',
      done: false,
      due: new Date(),
      name: 'Learning typescript',
      priority: Priority.High,
      text: 'Learning for upskill'
    },
  ]

  return (
    <div className="App">
      <PriorityList />
      <TodosAll items={todo} />
    </div>
  );
}

export default App;
