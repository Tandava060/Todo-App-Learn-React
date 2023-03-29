import { Priority } from "../../models/Priority";
import Todo from "../../models/Todo";
import { Avatar, Card, Modal } from "antd";
import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import { useState } from "react";
import useTodoStore from "../../store/use-todo-store";
import useHttp from "../../hooks/use-http";
import useNotificationStore from "../../store/use-notification-store";


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
            await makeRequest(`http://localhost:3000/Todos/${item.id}`, "DELETE");
            todoStore.removeTodo(item.id);
            notiffStore.showSuccessNotiff(`Task ${item.name} has been deleted!`)
        } catch (errorMsg: any) {
            notiffStore.showErrorNotiff(errorMsg)
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
            await makeRequest(`http://localhost:3000/Todos/${item.id}`, 'PUT', updatedItem)
            todoStore.updateTodo(updatedItem);
            notiffStore.showSuccessNotiff(`Task ${item.name} has been completed!`)
        } catch (errorMsg: any) {
            notiffStore.showErrorNotiff(errorMsg)
        } finally {
            setIsEditModalOpen(false);
        }
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
    };

    const cardActions = [
        <DeleteOutlined onClick={showDeleteModal} />,
        <EditOutlined onClick={() => console.log("edit")} />,
        <CheckOutlined onClick={showEditModal} />,
    ]

    return (
        <>
            <Card actions={cardActions} style={{ margin: '20px' }}>
                <Meta
                    avatar={<Avatar className={priorityClass} size="small" />}
                    title={item.name}
                    description={item.text}
                />
            </Card>

            <Modal title="Delete Item" open={isDeleteModalOpen} onOk={handleDeleteRequest} okText='Delete' okType="danger" onCancel={handleDeleteCancel}>
                <p>Are you sure you want to delete task '{item.name}'</p>
            </Modal>

            <Modal title="Complete Item" open={isEditModalOpen} onOk={handleEditRequest} okText='Yes' okType="danger" onCancel={handleEditCancel}>
                <p>Have you completed task '{item.name}' ?</p>
            </Modal>


        </>



    )
}

export default TodoItem;