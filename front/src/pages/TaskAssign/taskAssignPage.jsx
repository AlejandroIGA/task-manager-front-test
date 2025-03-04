import React, { useState, useEffect } from "react";
import { Button} from 'antd';
import MainLayout from "../../layout/MainLayout";
import CardComponent from "../../components/cardComponent";
import './style.css'
import ModalTasks from "../../components/modalTasks";
import TaskCard from "../../components/taskCard";
import AuthGuard from "../../components/authGuard/AuthGuard";
const TaskAssignPage = () => {
    const [groups, setGroups] = useState([]); 
    const [group, setGroup] = useState('');
    const [tasks, setTasks] = useState([]); //todos los usuarios que pertenecen al grupo
    const [taskToEdit, setTaskToEdit] = useState(null);

    const [message, setMessage] = useState(''); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    let user = localStorage.getItem("user")

    const API_URL = import.meta.env.VITE_API_URL;

    const fetchGroups = async () => { //alimentar dropdown
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

    const fetchTasks = async (group) => { 
        try {
            const response = await fetch(`${API_URL}/tasks/group/${group}`);
            const data = await response.json();
            setTasks(data.tasks);
            setMessage(data.msg)
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error al conectar con el servidor");
        }
    };


    const handleOpenModal = () =>{
        setIsModalOpen(true); 
    }

    const handleSubmit = async (data) =>{
        //console.log("AQUI ESTA LA PETICION");
        fetch(`${API_URL}/tasks/update/${data.id}`, {
            method: 'PUT',
            mode: "cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                user: localStorage.getItem("user"),
                name: data.name,
                description: data.description,
                category: data.category,
                status: data.status,
                date: data.date,
                group: data.group,
                assignedUser: data.assignedUser
            })
        }).then(
            setTaskToEdit(null),
            fetchTasks(group)
        )
    }

    const handleDelete= async(id) => {
        const response = await fetch(`${API_URL}/tasks/delete/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();
        if (response.ok) {
            fetchTasks(group)
        } else {
            alert("Error: " + data.message);
        }

    }

    const handleEditTask = (task) => {
        setTaskToEdit(task);
        setIsModalOpen(true); 
    };

    function handleGroup(e){
        const selectedGroup = e.target.value;
        setGroup(selectedGroup);
        if (selectedGroup) {
            fetchTasks(selectedGroup); // Obtener miembros del grupo seleccionado
        } else {
            setTasks([]); // Limpiar la lista de miembros si no se selecciona un grupo
            setMessage("Seleccione un grupo");
        }
    }

    useEffect(() => {
        fetchGroups();
    }, []);

    return (
        <AuthGuard>
            <MainLayout
                title = {"Asignación de tareas"}                
                rightContent={
                    <CardComponent
                    content={
                        <>
                            <select
                                onChange = {handleGroup}
                                value = {group}
                            >
                                <option value="">Seleccione un grupo</option>
                                {
                                    groups.map((group)=>(
                                        <option key={group.id} value={group.name}>{group.name}</option>
                                    ))
                                }
                            </select>
                            {
                                tasks.length == 0 ? 
                                <p>{message}</p>
                                :
                                tasks.map((task)=>(
                                    <TaskCard
                                        key={task.id}
                                        name={task.name}
                                        status={task.status}
                                        group={task.group}
                                        assignedUser={task.assignedUser}
                                        description={task.description}
                                        id = {task.id}
                                        onDelete={() => handleDelete(task.id)}
                                        onEdit={() => handleEditTask(task)}
                                    />
                                ))
                            }
                        </>
                    }
                    />
                }
            />
            <ModalTasks
                isModalOpen = {isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onSubmit = {handleSubmit}
                taskToEdit = {taskToEdit}
                setTaskToEdit = {setTaskToEdit}
                view={"asignación"}
            />
        </AuthGuard>
    );
};

export default TaskAssignPage;