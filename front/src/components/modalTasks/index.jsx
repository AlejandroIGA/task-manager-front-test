import React from "react";
import { useState, useEffect } from 'react'
import { Button, Modal } from 'antd';
import './style.css'

const ModalTasks = ({ isModalOpen, setIsModalOpen, onSubmit, taskToEdit, setTaskToEdit, view }) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('En progreso');
    const [category, setCategory] = useState('Baja');
    const [group, setGroup] = useState('Sin grupo');
    const [assignedUser, setAssignedUser] = useState('Sin asignar');
    const [id, setId] = useState('');

    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);

    const [user, setUser] = useState(localStorage.getItem("user"))

    const API_URL = import.meta.env.VITE_API_URL;

    const fetchUsers = async (group) => {
        try {
            const response = await fetch(`${API_URL}/members/${group}`);
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fetchGroups = async () => {
        try {
            const response = await fetch(`${API_URL}/groups/${user}`);
            const data = await response.json();
            setGroups(data.groups);
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const handleOk = () => {
        setIsModalOpen(false);
        setTaskToEdit(null);
        onSubmit({ name, description, date, status, category, group, assignedUser, user, id });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setTaskToEdit(null);

        setName('');
        setDescription('');
        setDate('');
        setStatus('En progreso');
        setCategory('');
        setGroup('Sin grupo');
        setAssignedUser('Sin asignar')

    };

    function handleName(e) {
        setName(e.target.value);
    }

    function handleDescription(e) {
        setDescription(e.target.value)
    }

    function handleDate(e) {
        setDate(e.target.value)
    }

    function handleStatus(e) {
        setStatus(e.target.value)
    }

    function handleCategory(e) {
        setCategory(e.target.value)
    }

    function handleGroup(e) {
        setGroup(e.target.value)
    }

    function hangdleAssignedUser(e) {
        setAssignedUser(e.target.value)
    }

    useEffect(() => {
        if (taskToEdit) {
            setName(taskToEdit.name || '');
            setDescription(taskToEdit.description || '');
            setId(taskToEdit.id || '');
            setAssignedUser(taskToEdit.assignedUser || '');
            setStatus(taskToEdit.status || 'En progreso');
            setCategory(taskToEdit.category || '');
            setGroup(taskToEdit.group || '');
            setUser(taskToEdit.user || '');
            if (taskToEdit.date) {
                const formattedDate = new Date(taskToEdit.date._seconds * 1000).toISOString().split("T")[0];
                setDate(formattedDate);
            } else {
                setDate('');
            }

            fetchUsers(taskToEdit.group);
            fetchGroups();
        } else {
            fetchUsers(group);
            fetchGroups();
        }
    }, [taskToEdit]);

    return (
        <>
            <Modal title={taskToEdit != null ? "Editar una tarea" : "Agregar una tarea"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancelar</Button>,
                    <Button key="submit" onClick={handleOk}>
                        {taskToEdit ? "Actualizar" : "Crear"}
                    </Button>,
                ]}
            >
                <form>
                    <label>Nombre de la tarea</label>
                    <input type="text" onChange={handleName} value={name} required minLength={3} maxLength={30} disabled={view == "tablero" ? true : false}></input>
                    <label>Descripción</label>
                    <input type='text' onChange={handleDescription} value={description} required disabled={view == "tablero" ? true : false}></input>
                    <label>Fecha limite</label>
                    <input type='date' onChange={handleDate} value={date} required disabled={view == "tablero" ? true : false}></input>
                    <label>Estatus</label>
                    <select
                        value={status}
                        onChange={handleStatus}
                        required
                        disabled={assignedUser != localStorage.getItem('user') && view == "asignación" ? true : false}
                    >
                        <option value="En progreso">En progreso</option>
                        <option value="Terminada">Terminada</option>
                        <option value="En pausa">En pausa</option>
                        <option value="En revisión">En revisión</option>
                    </select>
                    <label>Categoría</label>
                    <select
                        value={category}
                        onChange={handleCategory}
                        required
                        disabled={view == "tablero" ? true : false}
                    >
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                    </select>
                    {
                        view == "asignación" ?
                            <></>
                            :
                            <>
                                <label>Grupo</label>
                                <select
                                    value={group}
                                    onChange={handleGroup}
                                    disabled={view == "tablero" ? true : false}
                                >
                                    <option value="Sin grupo">Sin grupo</option>
                                    {
                                        view == "tablero" ?
                                            <option key={group.id} value={group}>{group}</option>
                                            :
                                            groups.map((group) => (
                                                <option key={group.id} value={group.name}>{group.name}</option>
                                            ))
                                    }
                                </select>
                            </>
                    }
                    {
                        view == "Tareas" ?
                            <></>
                            :
                            <>
                                <label>Usuario</label>
                                <select
                                    value={assignedUser}
                                    onChange={hangdleAssignedUser}
                                    disabled={view == "tablero" ? true : false}
                                >
                                    <option value="Sin asignar">Sin asignar</option>
                                    {
                                        users.map((user) => (
                                            <option key={user.id} value={user.user}>{user.user}</option>
                                        ))
                                    }
                                </select>
                            </>
                    }
                    <input type='text' value={user} hidden></input>
                </form>
            </Modal>
        </>
    );
};
export default ModalTasks;