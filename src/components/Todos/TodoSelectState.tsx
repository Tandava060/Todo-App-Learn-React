import Select from 'antd/es/select';
import { AllTodosState } from 'models/AllTodosState';

const TodosSelectState: React.FC<{ changeState: (changedState: AllTodosState) => void }> = ({ changeState }) => {

    const handleChange = (value: string) => {
        changeState(Number(value));
    };

    return (
        <div className="flex-align-center">
            <Select
                defaultValue={AllTodosState.Todo.toString()}
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                    { value: AllTodosState.All.toString(), label: 'All' },
                    { value: AllTodosState.Done.toString(), label: 'Done' },
                    { value: AllTodosState.Todo.toString(), label: 'Todo' },
                ]}
            />
        </div>
    );
};

export default TodosSelectState;