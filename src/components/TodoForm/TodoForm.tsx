import { zodResolver } from '@hookform/resolvers/zod';
import { Card, Row, Col, Button } from 'antd';
import { Priority } from 'models/Priority';
import Todo from 'models/Todo';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is Required' }),
    due: z.string().min(1, { message: 'Due Date is Required' })
        .refine((val) => {
            const value = new Date(val);
            const now = new Date();
            const selectedDate = new Date(value.getFullYear(), value.getMonth(), value.getDate());
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            return selectedDate > today;
        }, 'Due date should be greater than today.'),
    text: z.string().min(1, { message: 'Text is required' }),
    priority: z.string()
});


const TodoForm: React.FC<{ sendData: (todo: (Omit<Todo, 'id'> | Todo), reset: () => void) => void, todo?: Todo }> = ({ sendData, todo = null }) => {

    useEffect(() => {
        if (todo) {
            setValue('name', todo.name);
            setValue('due', todo.due.toISOString().slice(0, 10));
            setValue('priority', todo.priority.toString());
            setValue('text', todo.text);
        }
    }, [todo]);

    type FormSchemaType = z.infer<typeof formSchema>;

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        mode: 'onChange'
    });


    const submitHandler = handleSubmit(async (formData) => {
        const newTodo: Omit<Todo, 'id'> = {
            ...formData,
            done: false,
            due: new Date(formData.due),
            priority: Number(formData.priority),
        };
        sendData(newTodo, reset);

    });

    return (
        (<Card className="form-container">
            <div style={{ textAlign: 'center' }}>
                <h3>Create New Task</h3>

            </div>

            <form data-testid="form" onSubmit={() => submitHandler}>
                <Row className="form-control">
                    <Col sm={24} lg={6} xl={5}>
                        <label htmlFor="title">Title :</label>
                    </Col>
                    <Col sm={24} lg={18} xl={19}>
                        <input
                            data-testid="title"
                            {...register('name')}
                            type="text"
                            id="title"
                        />
                        {errors.name && <p className="error">{errors.name.message}</p>}
                    </Col>
                </Row>

                <Row className="form-control">
                    <Col sm={24} lg={6} xl={5}>
                        <label htmlFor="date">Due Date :</label>
                    </Col>
                    <Col sm={24} lg={18} xl={19}>
                        <input
                            data-testid="date"
                            {...register('due')}
                            type="date"
                            id="date"
                        />
                        {errors.due && <p className="error">{errors.due.message}</p>}
                    </Col>
                </Row>

                <Row className="form-control">
                    <Col sm={24} lg={6} xl={5}>
                        <label htmlFor="priority">Priority :</label>
                    </Col>
                    <Col sm={24} lg={18} xl={19}>
                        <select
                            data-testid="priority"
                            {...register('priority')}
                        >
                            <option value={Priority.Low}>Low</option>
                            <option value={Priority.Normal}>Normal</option>
                            <option value={Priority.High}>High</option>
                        </select>
                    </Col>
                </Row>

                <Row className="form-control">
                    <Col sm={24} lg={6} xl={5}>
                        <label htmlFor="text">Text :</label>
                    </Col>
                    <Col sm={24} lg={18} xl={19}>
                        <textarea
                            data-testid="text"
                            id="text"
                            {...register('text')}
                        />
                        {errors.text && <p className="error">{errors.text.message}</p>}
                    </Col>
                </Row>

            </form>
            <div style={{ textAlign: 'end' }}>
                <Link to='..'><Button style={{ marginRight: '20px' }}>Back</Button></Link>
                <Button type="primary" danger onClick={submitHandler}>Submit</Button>
            </div>
        </Card>)
    );
};

export default TodoForm;