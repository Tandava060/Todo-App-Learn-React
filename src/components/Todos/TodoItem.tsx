import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import { Card, Avatar, Modal } from 'antd';
import useHttp from 'hooks/use-http';
import { Priority } from 'models/Priority';
import Todo from 'models/Todo';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useNotificationStore from 'store/use-notification-store';
import useTodoStore from 'store/use-todo-store';


const { Meta } = Card;
const TodoItem: React.FC<{ item: Todo }> = ({
    item
}) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const todoStore = useTodoStore();
    const notiffStore = useNotificationStore();
    const priorityClass = Priority[item.priority].toLowerCase() + '-circle';
    const { makeRequest } = useHttp();

    const showDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteRequest = async () => {
        try {
            await makeRequest(`http://localhost:3000/Todos/${item.id}`, 'DELETE');
            todoStore.removeTodo(item.id);
            notiffStore.showSuccessNotiff(`Task ${item.name} has been deleted!`);
        } catch (errorMsg: unknown) {
            notiffStore.showErrorNotiff(errorMsg as string);
        } finally {
            setIsDeleteModalOpen(false);
        }
    };

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
    };

    const showEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleEditRequest = async () => {
        try {
            const updatedItem = { ...item, done: true };
            await makeRequest(`http://localhost:3000/Todos/${item.id}`, 'PUT', updatedItem);
            todoStore.updateTodo(updatedItem);
            notiffStore.showSuccessNotiff(`Task ${item.name} has been completed!`);
        } catch (errorMsg: unknown) {
            notiffStore.showErrorNotiff(errorMsg as string);
        } finally {
            setIsEditModalOpen(false);
        }
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
    };

    const cardActions = [
        <DeleteOutlined data-testid="delete-button" onClick={showDeleteModal} />,
        <Link to={`/todo/edit/${item.id}`} ><EditOutlined /></Link>,
        <CheckOutlined data-testid="complete-button" onClick={showEditModal} />,
    ];

    return (
        <>
            <Card data-testid="todo-item" actions={cardActions} style={{ margin: '20px' }}>
                <Meta
                    avatar={<Avatar className={priorityClass} size="small" />}
                    title={item.name}
                    description={item.text}
                />
            </Card>

            <Modal title="Delete Item" open={isDeleteModalOpen} onOk={handleDeleteRequest} okText='Delete' okType="danger" onCancel={handleDeleteCancel}>
                <p>Are you sure you want to delete task `&apos;{item.name}`&apos;</p>
            </Modal>

            <Modal title="Complete Item" open={isEditModalOpen} onOk={handleEditRequest} okText='Yes' okType="danger" onCancel={handleEditCancel}>
                <p>Have you completed task `&apos;{item.name}`&apos; ?</p>
            </Modal>
        </>
    );
};

export default TodoItem;