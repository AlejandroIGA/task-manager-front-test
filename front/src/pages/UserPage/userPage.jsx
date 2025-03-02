import React, { useState, useEffect, use } from "react";
import { Button } from 'antd';
import MainLayout from "../../layout/MainLayout";
import CardComponent from "../../components/cardComponent";
import './style.css'
import ModalUser from "../../components/modalUser";
import UserCard from "../../components/userCard";
import AuthGuard from "../../components/authGuard/AuthGuard";

const UserPage = () => {
    let actualUser = localStorage.getItem("user")

    const [users, setUsers] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [message, setMessage] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/users/${actualUser}`);
            const data = await response.json();
            setUsers(data.users);
            setMessage(data.msg)
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error al conectar con el servidor");
        }
    };

    const handleEditTask = (user) => {
        setUserToEdit(user);
        setIsModalOpen(true);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleSubmit = async (data) => {
        if (userToEdit == null) {

            fetch(`${API_URL}/register`,{
                method: 'POST',
                mode: "cors", 
                headers:{
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    user: data.user.trim(),
                    psw: data.psw,
                    email: data.email,
                    rol: data.rol
                })
            })
            .then(
                setUserToEdit(null),
                fetchUsers()
            );
        } else {
            fetch(`${API_URL}/users/update/${userToEdit.id}`, {
                method: 'PUT',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    user: data.user.trim(),
                    psw: data.psw,
                    email: data.email,
                    rol: data.rol
                })
            }).then(
                setUserToEdit(null),
                fetchUsers()
            )
        }
    }

    const handleDelete = async (id) => {
        const response = await fetch(`${API_URL}/users/delete/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();
        if (response.ok) {
            fetchUsers()
        } else {
            alert("Error: " + data.message);
        }

    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <AuthGuard>
            <MainLayout
                title={"Usuarios"}
                rightContent={
                    <CardComponent
                        action={<Button onClick={() => handleOpenModal()} className="floating-button">Añadir usuario</Button>}
                        content={
                            <>
                                {
                                    users.length == 0 ?
                                        <p>{message}</p>
                                        :
                                        users.map((user) => (
                                            <UserCard
                                                key={user.id}
                                                name={user.user}
                                                rol={user.rol}
                                                onEdit={() => handleEditTask(user)}
                                                onDelete={() => handleDelete(user.id)}
                                            />
                                        ))
                                }
                            </>
                        }
                    />
                }
            />
            <ModalUser
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                userToEdit={userToEdit}
                setUserToEdit={setUserToEdit}
                onSubmit={handleSubmit}
            />
        </AuthGuard>
    );
};

export default UserPage;