import { Priority } from "../../models/Priority";
import Todo from "../../models/Todo";
import { Avatar, Card, Modal, Spin } from "antd";
import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import { useState } from "react";
import useTodoStore from "../../store/use-todo-store";
import useHttp from "../../hooks/use-http";


const { Meta } = Card;
const TodoItem: React.FC<{ item: Todo }> = ({ item }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const todoStore = useTodoStore();
    const priorityClass = Priority[item.priority].toLowerCase() + '-circle';
    const { dataReceived, error, isLoading, makeRequest } = useHttp();

    const showDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteRequest = async () => {

        makeRequest(`http://localhost:3000/Todos/${item.id}`, 'DELETE')
        if (!error) {
            todoStore.removeTodo(item.id)
        }
        setIsDeleteModalOpen(false);

    };

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
    };

    const showEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleEditRequest = async () => {

        makeRequest(`http://localhost:3000/Todos/${item.id}`, 'PUT', { ...item, done: true })
        if (!error) {
            console.log(dataReceived)
            // todoStore.removeTodo(item.id)
        }
        setIsEditModalOpen(false);

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

            <Spin spinning={isLoading}>
                <Modal title="Delete Item" open={isDeleteModalOpen} onOk={handleDeleteRequest} okText='Delete' okType="danger" onCancel={handleDeleteCancel}>
                    <p>Are you sure you want to delete task '{item.name}'</p>
                </Modal>

                <Modal title="Complete Item" open={isEditModalOpen} onOk={handleEditRequest} okText='Yes' okType="danger" onCancel={handleEditCancel}>
                    <p>Have you completed task '{item.name}' ?</p>
                </Modal>
            </Spin>
        </>



    )
}

export default TodoItem;