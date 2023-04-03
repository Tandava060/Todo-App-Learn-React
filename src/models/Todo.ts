import { Priority } from './Priority';

interface Todo {
  id: number;
  done: boolean;
  name: string;
  priority: Priority;
  due: Date;
  text: string;
}

export default Todo;
