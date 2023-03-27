import { Priority } from "../../models/Priority";
import Todo from "../../models/Todo";
import { Avatar, Card, Modal } from "antd";
import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import { useState } from "react";


const { Meta } = Card;
const TodoItem: React.FC<{ item: Todo }> = ({ item }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const priorityClass = Priority[item.priority].toLowerCase() + '-circle';

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const cardActions = [
        <DeleteOutlined onClick={showModal} />,
        <EditOutlined onClick={() => console.log("edit")} />,
        <CheckOutlined />,
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

            <Modal title="Delete Item" open={isModalOpen} onOk={handleOk} okText='Delete' okType="danger" onCancel={handleCancel}>
                <p>Are you sure you want to delete task '{item.name}'</p>
            </Modal>
        </>



    )
}

export default TodoItem;