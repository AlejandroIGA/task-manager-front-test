import React, { useState, useEffect, use } from "react";
import { Button } from 'antd';
import MainLayout from "../../layout/MainLayout";
import CardComponent from "../../components/cardComponent";
import './style.css'
import GroupCard from "../../components/groupCard";
import ModalGroup from "../../components/modalGroup";
import AuthGuard from "../../components/authGuard/AuthGuard";

const GroupPage = () => {
    const [groups, setGroups] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupToEdit, setGroupToEdit] = useState(null);
    const [message, setMessage] = useState('');

    let user = localStorage.getItem("user")

    const API_URL = import.meta.env.VITE_API_URL;

    const fetchGroups = async () => {
        try {
            const response = await fetch(`${API_URL}/groups/${user}`);
            const data = await response.json();
            setGroups(data.groups);
            setMessage(data.msg)
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error al conectar con el servidor");
        }
    };

    const handleEditTask = (group) => {
        setGroupToEdit(group);
        setIsModalOpen(true);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleSubmit = async (data) => {
        if (groupToEdit == null) {

            fetch(`${API_URL}/groups`, {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    createdBy: data.createdBy,
                    name: data.name,
                })
            }).then(
                setGroupToEdit(null),
                fetchGroups()
            )
        } else {
            fetch(`${API_URL}/groups/update/${groupToEdit.id}`, {
                method: 'PUT',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    createdBy: data.createdBy,
                    name: data.name,
                })
            }).then(
                setGroupToEdit(null),
                fetchGroups()
            )
        }
    }

    const handleDelete = async (id) => {
        const response = await fetch(`${API_URL}/groups/delete/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();
        if (response.ok) {
            fetchGroups()
        } else {
            alert("Error: " + data.message);
        }

    }

    useEffect(() => {
        fetchGroups();
    }, []);

    return (
        <AuthGuard>
            <MainLayout
                title={"Grupos"}
                rightContent={
                    <CardComponent
                        action={<Button onClick={() => handleOpenModal()} className="floating-button">Añadir grupo</Button>}
                        content={
                            <>
                                {
                                    groups.length == 0 ?
                                        <p>{message}</p>
                                        :
                                        groups.map((group) => (
                                            <GroupCard
                                                key={group.id}
                                                name={group.name}
                                                onEdit={() => handleEditTask(group)}
                                                onDelete={() => handleDelete(group.id)}
                                            />
                                        ))
                                }
                            </>
                        }
                    />
                }
            />
            <ModalGroup
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                groupToEdit={groupToEdit}
                setGroupToEdit={setGroupToEdit}
                onSubmit={handleSubmit}
            />
        </AuthGuard>
    );
};

export default GroupPage;