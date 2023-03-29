import React, { useState } from "react";
import { Card, Row, Col, Button } from 'antd';
import { Priority } from "../../models/Priority";
import Todo from "../../models/Todo";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import useTodoStore from "../../store/use-todo-store";
import useNotificationStore from "../../store/use-notification-store";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type FormErrors = {
    title?: string;
    date?: string;
    priority?: string;
    text?: string;
};

const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is Required' }),
    due: z.string().refine((val) => {
        let value = new Date(val);
        const now = new Date();
        const selectedDate = new Date(value.getFullYear(), value.getMonth(), value.getDate());
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return selectedDate > today
    }, "Due date should be greater than today."),
    text: z.string().min(1, { message: 'Text is required' }),
    priority: z.string()
});


const NewTodosForm: React.FC = () => {

    const [title, setTitle] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [priority, setPriority] = useState<Priority>(Priority.Normal);
    const [text, setText] = useState<string>('');
    // const [errors, setErrors] = useState<FormErrors>({});
    const { makeRequest } = useHttp();
    const todoStore = useTodoStore();
    const notiffStore = useNotificationStore();

    type FormSchemaType = z.infer<typeof formSchema>;
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema)
    });


    const submitHandler = handleSubmit((formData) => {
        console.log(formData, errors);
        // if (validateForm()) {
        //     const newTodo: Omit<Todo, "id"> = {
        //         done: false,
        //         name: title,
        //         priority: priority,
        //         due: new Date(dueDate),
        //         text: text
        //     }

        //     try {
        //         const dataReceived = await makeRequest('http://localhost:3000/Todos', 'POST', newTodo);
        //         todoStore.addTodo(dataReceived);
        //         notiffStore.showSuccessNotiff('New Todo has successfully been created!')
        //         clearForm();
        //     } catch (errorMsg: any) {
        //         notiffStore.showSuccessNotiff(errorMsg)
        //     }
        // }
    })



    const clearForm = () => {
        setDueDate('');
        setPriority(Priority.Normal);
        setText('');
        setTitle('');
    }

    const form = (<Card className="form-container">
        <div style={{ textAlign: "center" }}>
            <h3>Create New Task</h3>

        </div>

        <form onSubmit={() => submitHandler}>
            <Row className="form-control">
                <Col sm={24} lg={6} xl={5}>
                    <label htmlFor="title">Title :</label>
                </Col>
                <Col sm={24} lg={18} xl={19}>
                    <input
                        {...register("name")}
                        type="text"
                        id="title"
                    // value={title}
                    // onChange={titleChangeHandler}
                    // onBlur={titleChangeHandler}
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
                        {...register("due")}
                        type="date"
                        id="date"
                    // value={dueDate}
                    // onChange={dateChangeHandler}
                    // onBlur={dateChangeHandler}
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
                        id="priority"
                        // value={priority}
                        // onChange={(e) => setPriority(Number(e.target.value))}
                        {...register("priority")}
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
                        id="text"
                        // value={text}
                        {...register("text")}
                    // onChange={textChangeHandler}
                    // onBlur={textChangeHandler}
                    />
                    {errors.text && <p className="error">{errors.text.message}</p>}
                </Col>
            </Row>

        </form>
        <div style={{ textAlign: "end" }}>
            <Link to='..'><Button style={{ marginRight: '20px' }}>Back</Button></Link>
            <Button type="primary" danger onClick={submitHandler}>Submit</Button>
        </div>
    </Card>)

    return (
        <>
            {form}
        </>
    )
}

export default NewTodosForm;