import React, { useState } from "react";
import { Card, Row, Col, Button, Spin, notification } from 'antd';
import { Priority } from "../../models/Priority";
import Todo from "../../models/Todo";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import useTodoStore from "../../store/use-todo-store";

type FormErrors = {
    title?: string;
    date?: string;
    priority?: string;
    text?: string;
};

const NewTodosForm: React.FC = () => {

    const [title, setTitle] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [priority, setPriority] = useState<Priority>(Priority.Normal);
    const [text, setText] = useState<string>('');
    const [errors, setErrors] = useState<FormErrors>({});
    const { dataReceived, error, isLoading, makeRequest } = useHttp();
    const todoStore = useTodoStore();
    const [api, contextHolder] = notification.useNotification();

    const submitHandler = async () => {
        if (validateForm()) {
            const newTodo: Omit<Todo, "id"> = {
                done: false,
                name: title,
                priority: priority,
                due: new Date(dueDate),
                text: text
            }

            try {
                const dataReceived = await makeRequest('http://localhost:3000/Todos', 'POST', newTodo);
                todoStore.addTodo(dataReceived);
                openNotification()
            } catch (errorMsg) {
                console.log("Error while deleting:", errorMsg);
            }

            clearForm()
        }
    }

    const openNotification = () => {
        api.error({
            message: `Notification`,
            description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        })
    };

    const clearForm = () => {
        setDueDate('');
        setPriority(Priority.Normal);
        setText('');
        setTitle('');
    }

    const isEmpty = (value: string) => !value.trim();
    const isDateInvalid = (value: Date) => {
        const now = new Date();
        const selectedDate = new Date(value.getFullYear(), value.getMonth(), value.getDate());
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return selectedDate < today
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if (isEmpty(title)) {
            newErrors.title = 'Title is required.';
        }
        if (isEmpty(dueDate)) {
            newErrors.date = 'Due date is required.';
        } else if (isDateInvalid(new Date(dueDate))) {
            newErrors.date = 'Due date should be greater than today.';
        }

        if (isEmpty(text)) {
            newErrors.text = 'Text is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        if (isEmpty(event.target.value)) {
            setErrors(errors => {
                return { ...errors, title: 'Title is required.' }
            });
        } else {
            setErrors(errors => {
                delete errors['title'];
                return { ...errors }
            });
        }
    }

    const dateChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(event.target.value);
        if (isEmpty(event.target.value)) {
            setErrors(errors => {
                return { ...errors, date: 'Due Date is required.' }
            });
        } else if (isDateInvalid(new Date(event.target.value))) {
            setErrors(errors => {
                return { ...errors, date: 'Due date should be greater than today.' }
            });
        } else {
            setErrors(errors => {
                delete errors['date'];
                return { ...errors }
            });
        }
    }

    const textChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement> | React.FocusEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        if (isEmpty(event.target.value)) {
            setErrors(errors => {
                return { ...errors, text: 'Text is required.' }
            });
        } else {
            setErrors(errors => {
                delete errors['text'];
                return { ...errors }
            });
        }
    }


    const form = (<Card className="form-container">
        <div className='flex-align-center justify-space-between'>
            <h3>Create New Task</h3>
            <div>
                <Link to='..'><Button style={{ marginRight: '20px' }}>Back</Button></Link>
                <Button type="primary" onClick={submitHandler}>Submit</Button>
            </div>
        </div>

        <form onSubmit={() => submitHandler}>
            <Row className="form-control">
                <Col span={4}>
                    <label htmlFor="title">Title</label>
                </Col>
                <Col span={20}>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={titleChangeHandler}
                        onBlur={titleChangeHandler}
                    />
                    {errors.title && <p className="error">{errors.title}</p>}
                </Col>
            </Row>

            <Row className="form-control">
                <Col span={4}>
                    <label htmlFor="date">Due Date</label>
                </Col>
                <Col span={20}>
                    <input
                        type="date"
                        id="date"
                        value={dueDate}
                        onChange={dateChangeHandler}
                        onBlur={dateChangeHandler}
                    />
                    {errors.date && <p className="error">{errors.date}</p>}
                </Col>
            </Row>

            <Row className="form-control">
                <Col span={4}>
                    <label htmlFor="priority">Priority</label>
                </Col>
                <Col span={20}>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(Number(e.target.value))}
                    >
                        <option value={Priority.Low}>Low</option>
                        <option value={Priority.Normal}>Normal</option>
                        <option value={Priority.High}>High</option>
                    </select>
                </Col>
            </Row>

            <Row className="form-control">
                <Col span={4}>
                    <label htmlFor="text">Text</label>
                </Col>
                <Col span={20}>
                    <textarea
                        id="text"
                        value={text}
                        onChange={textChangeHandler}
                        onBlur={textChangeHandler}
                    />
                    {errors.text && <p className="error">{errors.text}</p>}
                </Col>
            </Row>

        </form>
    </Card>)

    return (
        <>
            {contextHolder}
            <Spin spinning={isLoading}>
                {form}
            </Spin>
        </>
    )
}

export default NewTodosForm;