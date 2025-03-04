import React, { useState, useEffect } from "react";
import { Button, notification} from 'antd';
import MainLayout from "../../layout/MainLayout";
import CardComponent from "../../components/cardComponent";
import ModalTasks from "../../components/modalTasks";
import TaskCard from "../../components/taskCard";
import './style.css'
import AuthGuard from "../../components/authGuard/AuthGuard";

const TasksPage = () => {
    const [tasks, setTasks] = useState([]); 
    const [message, setMessage] = useState(''); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const [api, contextHolder] = notification.useNotification();


    let user = localStorage.getItem("user")

    const API_URL = import.meta.env.VITE_API_URL;

    const openNotificationWithIcon = (type, msg) => {
        api[type]({
          message: ".",
          description: msg
        });
      };

    const fetchTasks = async () => {
        try {
            const response = await fetch(`${API_URL}/tasks/${user}`);

            const data = await response.json();
            setTasks(data.tasks); 
            setMessage(data.msg)            
            
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error al conectar con el servidor");
            openNotificationWithIcon('error',"Error al conectar con el servidor")
        }
    };

    const handleEditTask = (task) => {
        setTaskToEdit(task);
        setIsModalOpen(true); 
    };

    const handleOpenModal = () =>{
        setIsModalOpen(true); 
    }

    const handleSubmit = async (data) => {
        try {
            let url, method;
            if (taskToEdit == null) {
                url = `${API_URL}/tasks`;
                method = 'POST';
            } else {
                url = `${API_URL}/tasks/update/${taskToEdit.id}`;
                method = 'PUT';
            }
            console.log(data)
            const response = await fetch(url, {
                method: method,
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
            });
    
            const dataResponse = await response.json();
            if (!response.ok) {
                openNotificationWithIcon('error', dataResponse.msg);
            }
    
            setTaskToEdit(null);
            fetchTasks(); // Actualiza la lista de tareas
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete= async(id) => {
        const response = await fetch(`${API_URL}/tasks/delete/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();
        if (response.ok) {
            fetchTasks()
        } else {
            alert("Error: " + data.message);
        }

    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <AuthGuard>
            
            <MainLayout
                title = {"Tareas"}
                rightContent={
                    <CardComponent
                        action={<Button onClick={() => handleOpenModal()} className="floating-button">Añadir tarea</Button>}
                        content={
                            <>
                                {
                                 tasks.length == 0? 
                                  <p> {message}</p>
                                 : 
                                tasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        name={task.name}
                                        status={task.status}
                                        group={task.group}
                                        assignedUser={task.assignedUser}
                                        description={task.description}
                                        id = {task.id}
                                        onEdit={() => handleEditTask(task)}
                                        onDelete={() => handleDelete(task.id)}
                                    />
                                ))}
                            </>
                        }
                    />
                }
            />
            {contextHolder}
            <ModalTasks
                isModalOpen = {isModalOpen}
                setIsModalOpen={setIsModalOpen}
                taskToEdit = {taskToEdit}
                setTaskToEdit = {setTaskToEdit}
                onSubmit = {handleSubmit}
                view={"Tareas"}
            />
        </AuthGuard>
    );
};

export default TasksPage;